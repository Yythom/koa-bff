import fs from 'fs';
import FormData from 'form-data';
import api from '../../api/index';

module.exports = {
    upload: async (ctx, next) => {
        const { files } = ctx.request;

        // console.log(ctx.request.header.token);
        const res = await new Promise((resolve) => {
            const filesData = {};
            Object.keys(files).forEach((key, index) => {
                const file = files[key];
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

};
