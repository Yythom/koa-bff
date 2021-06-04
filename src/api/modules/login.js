const request = require('../../utils/request');

const login = {
    loginApi(data, ctx) {
        return request({
            url: '/order/online/paySuccess/show/result',
            method: 'post',
            data,
        }, ctx);
    },
};

module.exports = login;
