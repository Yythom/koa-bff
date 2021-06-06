import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import api from '../../api/index';
import remove from '../../utils/file/remove';

module.exports = {
    upload: async (ctx, next) => {
        const { files } = ctx.request;
        // console.log(ctx.request.header.token);
        const res = await new Promise((resolve) => {
            const filesData = {};
            Object.keys(files).forEach((key, index) => {
                const file = files[key];

                // const reader = fs.createReadStream(file.path);
                const fileName = `${file.name}`;
                const filePath = `${path.join(__dirname, '../../../uploads')}/${fileName}`;
                const upStream = fs.createWriteStream(filePath);
                fs.createReadStream(file.path).pipe(upStream);

                const stream = fs.readFileSync(file.path);
                const form = new FormData();
                form.append('blob', stream);
                api.file.upload(form, ctx).then((_res) => {
                    filesData[file.name] = _res;
                    if (Object.keys(files).length === index + 1) resolve({ ...filesData });
                });
            });
        });

        ctx.body = res;
    },

    del: async (ctx, next) => {
        const res = await new Promise((resolve, reject) => {
            fs.readdir(path.join(__dirname, '../../../uploads/'), (err, files) => {
                if (!files[0]) {
                    resolve(0);
                    return;
                }
                remove(path.join(__dirname, '../../../uploads/'), () => {
                    resolve(files.length);
                });
            });
        });

        ctx.body = `成功删除 ${res}个文件`;
    },

};
