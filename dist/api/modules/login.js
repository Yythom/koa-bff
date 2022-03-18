"use strict";

var request = require('../../utils/request');

var login = {
  loginApi: function loginApi(data, ctx) {
    return request({
      url: '/order/online/paySuccess/show/result',
      method: 'post',
      data: data
    }, ctx);
  }
};
module.exports = login;