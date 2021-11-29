import fs from 'fs-extra';
import path from 'path';
import jimp from 'jimp';
import QrcodeReader from 'qrcode-reader';

const decodeImage = jimp.read;
const savePath = path.join(__dirname, '../../../public/uploads/');
// qrDecode("123.png", function (data) {
//     console.log(data);
// });
const qrDecode = async (data) => new Promise((resolve, reject) => {
    decodeImage(data, (err, image) => {
        if (err) {
            resolve(false);
            return;
        }
        const decodeQR = new QrcodeReader();
        decodeQR.callback = function (errorWhenDecodeQR, result) {
            if (errorWhenDecodeQR) {
                resolve(false);
                return;
            }
            if (!result) {
                resolve(false);
            } else {
                resolve(result.result);
            }
        };
        decodeQR.decode(image.bitmap);
    });
});

module.exports = {
    qrcode: async (ctx, next) => {
        const { files } = ctx.request;
        // console.log(files, 'ctx.request');
        try {
            const res = await new Promise((resolve) => {
                const filesData = {};
                Object.keys(files).forEach((key, index) => {
                    const file = files[key];
                    if (!key) resolve('上传文件不存在');
                    const fileName = `${file.name}`;
                    const filePath = `${savePath}${encodeURIComponent(fileName)}`;
                    const upStream = fs.createWriteStream(filePath);
                    fs.createReadStream(file.path).pipe(upStream);
                    const stream = fs.readFileSync(file.path);
                    qrDecode(filePath).then((code) => {
                        filesData[fileName] = code;
                        if (index === Object.keys(files).length - 1) {
                            resolve(filesData);
                        }
                    });
                });
            });
            ctx.body = res;
        } catch (error) {
            ctx.body = error;
        }
    },
};
