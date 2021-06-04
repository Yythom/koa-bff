const axios = require('axios');
const config = require('../config');

const request = (conf, ctx) => {
    const headers = {};
    if (ctx === 'test') {
        headers.token = 'dWlkPTExMDkwOCZsb25naXR1ZGU9MTE5LjQyNSZsYXRpdHVkZT0zMi4xODk1OSZzaWduPUI1ODkzMzZDRTYxMDdDNEQ5Njk3RDQzN0U4MUIwODFG';
    } else {
        headers.token = ctx.request.header;
    }

    const configSelf = Object.assign(conf, {
        baseURL: config.api_url,
        timeout: 10000,
        headers,
    });
    return new Promise((resolve, reject) => {
        axios(configSelf).then((res) => {
            // console.log(res.data.code, 'res');
            if (Number(res.data.code) === 0) {
                resolve({ ...res.data, code: Number(res.data.code) });
            } else {
                if (ctx === 'test') {
                    // console.log('test错误');
                    // reject({
                    //     code: res.data.code,
                    //     msg: res.data.msg,
                    // });
                }
                resolve({
                    code: res.data.code,
                    msg: res.data.msg,
                });
            }
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports = request;
