const { default: Axios } = require('axios');
const request = require('../../utils/request');

const file = {
    upload(data, ctx) {
        // return Axios.post('http://localhost:8701/upload', data, {
        //     headers: {
        //         ...data.getHeaders(),
        //         token: ctx.request.header.token || '',
        //     },
        // });
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('ζεδΊ');
            }, 300);
        });
    },
};

module.exports = file;
