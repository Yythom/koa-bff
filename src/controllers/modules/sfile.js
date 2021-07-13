import path from 'path';
import { pipeline } from 'stream';
import fs, { WriteStream } from 'fs-extra';
import { getIpAddress } from '../../utils/utils';
import config from '../../config';

const TMP_DIR = path.join(__dirname, '../../../public/tmp/');
const http = 'http://';
const PUBLIC_DIR = path.join(__dirname, '../../../public/uploads/');
// const DEFAULT_SIZE = 80 * 1024
const DEFAULT_SIZE = 80 * 1024 * 1024;

const pipeStream = (filePath, ws, options = {}, unlink = true) => new Promise((resolve, reject) => { // 通过pipeline利用stream背压机制避免阻塞、提升读写效率
    const rs = fs.createReadStream(filePath, options);
    pipeline(rs, ws, (err) => {
        if (err) return reject(err);
        unlink && fs.unlink(filePath); // 默认情况写完后删除读取的文件
        resolve(); // 读写结束时Promise变为fulfilled状态
        return true;
    });
});

const mergeChunks = async (filename, size = DEFAULT_SIZE) => {
    const filePath = path.join(PUBLIC_DIR, filename); // 合并后的文件写入的位置
    const exist = await fs.pathExists(filePath);
    if (!exist) { // 写入时的flag设置为'r+'，所以如果写入的文件不存在则先创建它
        await fs.createFile(filePath);
    }
    const chunksDir = path.join(TMP_DIR, filename); // 存放分片的目录
    const chunkFiles = await fs.readdir(chunksDir); // 获取分片文件名称数组。
    chunkFiles.sort((a, b) => +(a.split('-')[1]) - +(b.split('-')[1])); // 合并之前按照升序排序，避免出错。
    await Promise.all(chunkFiles.map((chunkFile, index) => pipeStream(
        path.join(chunksDir, chunkFile),
        fs.createWriteStream(filePath, {
            start: index * size,
            flags: 'r+', // 必须改为'r+'。默认是'w'，即截断式，如果分片较少时，通过promise.all进行并发写入时，writestream打开状态可以有两到三个(根据硬件性能决定)工作线程进行并行写入，此时可以成功写入；但是分片稍多时，会因为截断而导致前面写入的内容丢失从而导致文件内容不正确。
        }),
    )));
    fs.emptyDir(chunksDir, (err) => { // 合并结束后删除存放分片文件的目录
        if (err) return console.error('Meet some error while remove sub file or directory:', err);
        fs.rmdirSync(chunksDir);
        return true;
    });
};

module.exports = {
    s_upload: async (ctx, next) => {
        ctx.set('Content-Type', 'application/octet-stream');
        // filename为文件名称，也是存放分片文件的文件夹的名称；
        // chunk_name为分片文件名称；
        // start为分片文件写入时的开始位置——为了实现断点续传、暂停/恢复
        const { filename, chunk_name: chunkName, start: _start } = ctx.params;
        const start = +_start;
        const chunkDir = path.join(TMP_DIR, filename); // 分片文件保存的路径
        // console.log('params', ctx.params);
        const exist = await fs.pathExists(chunkDir);
        if (!exist) { // 分片文件目录不存在则先创建它
            fs.mkdirs(chunkDir);
        }
        const chunkFilePath = path.join(chunkDir, chunkName);
        const ws = fs.createWriteStream(chunkFilePath, { start, flags: 'a' }); // 创建写入分片文件的WriteStream

        ctx.req.on('end', () => { // 写入结束时关闭写入流并返回成功的响应
            ws.close();
            ctx.body = { success: true };
        });
        ctx.req.on('close', () => {
            console.log('close');
            return ws.close();
        }); // 中断(暂停或取消)时主动关闭分片写入流
        ctx.req.on('error', (err) => { // 发生错误时现关闭写入流再交给后续处理错误的中间件处理。
            // console.log(err, 'error');
            ws.close();
            next(err);
        });
        ctx.req.pipe(ws);
        ctx.body = { needUpload: true };
    },
    verify: async (ctx, next) => {
        const { filename } = ctx.params;
        const filePath = path.join(PUBLIC_DIR, filename); // 合并后的文件的路径
        const existFile = await fs.pathExists(filePath);
        if (existFile) { // 判断是否上传过(指定文件是否已经合并)
            ctx.body = {
                success: true,
                needUpload: false,
                url: `${`${http}${getIpAddress()}:${config.PORT}`}/file?url=${encodeURIComponent(filename)}`,
            };
            return;
        }
        const tempDir = path.join(TMP_DIR, filename); // 存放分片文件的路径
        const exist = await fs.pathExists(tempDir);
        let uploadList = [];
        if (exist) { // 分片文件目录存在说明已经上传过部分分片文件
            uploadList = await fs.readdir(tempDir);
            uploadList = await Promise.all(uploadList.map(async (chunk_name) => {
                const stat = await fs.stat(path.join(tempDir, chunk_name));
                return {
                    chunk_name, // 分片文件名称
                    size: stat.size, // 已经写入的大小
                };
            }));
        }
        ctx.body = {
            success: true,
            needUpload: true, // 需要继续上传
            uploadList, // 保存已上传的分片的信息的数组
        };
    },
    merge: async (ctx, next) => {
        const { filename, size } = ctx.params;
        await mergeChunks(filename, +size); // 进行文件合并，size表示分片文件的大小
        const url = `${`${http}${getIpAddress()}:${config.PORT}`}/file?url=${encodeURIComponent(filename)}`;
        ctx.body = {
            success: true,
            url,
        };
    },
};
