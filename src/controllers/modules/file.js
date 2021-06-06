import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import api from '../../api/index';
import remove from '../../utils/file/remove';
import config from '../../config';

const savePath = path.join(__dirname, '../../../public/uploads/');
const http = 'http://';
module.exports = {
    upload: async (ctx, next) => {
        const { files } = ctx.request;
        // console.log(ctx.request.header.token);
        const res = await new Promise((resolve) => {
            const filesData = {};
            Object.keys(files).forEach((key, index) => {
                const file = files[key];

                const fileName = `${file.name}`;
                const filePath = `${savePath}${encodeURIComponent(fileName)}`;
                const upStream = fs.createWriteStream(filePath);
                fs.createReadStream(file.path).pipe(upStream);

                const stream = fs.readFileSync(file.path);
                const form = new FormData();
                form.append('blob', stream);
                api.file.upload(form, ctx).then((_res) => {
                    const opt = {};
                    opt.result = _res;
                    opt.url = `${`${http}${config.HOST}:${config.PORT}`}/file?url=${encodeURIComponent(fileName)}`;
                    filesData[file.name] = opt;
                    if (Object.keys(files).length === index + 1) {
                        resolve({ ...filesData });
                    }
                });
            });
        });

        ctx.body = res;
    },

    del: async (ctx, next) => {
        const res = await new Promise((resolve, reject) => {
            fs.readdir(savePath, (err, files) => {
                console.log(err, files);
                if (err) {
                    resolve(err);
                }
                if (!files[0]) {
                    resolve(0);
                    return;
                }
                remove(savePath, () => {
                    resolve(files.length);
                });
            });
        });

        ctx.body = res;
    },

    get: async (ctx, next) => {
        const { url } = ctx.request.query;
        console.log(url);
        const stream = fs.readFileSync(`${savePath}/${encodeURIComponent(url)}`);
        ctx.body = stream;
    },

};
