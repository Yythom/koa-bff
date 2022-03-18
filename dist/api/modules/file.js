"use strict";

var _require = require('axios'),
    Axios = _require["default"];

var request = require('../../utils/request');

var file = {
  upload: function upload(data, ctx) {
    // return Axios.post('http://localhost:8701/upload', data, {
    //     headers: {
    //         ...data.getHeaders(),
    //         token: ctx.request.header.token || '',
    //     },
    // });
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve('成功了');
      }, 300);
    });
  }
};
module.exports = file;