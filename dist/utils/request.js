"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var axios = require('axios');

var config = require('../config');

var request = function request(conf, ctx) {
  var headers = {};

  if (ctx === 'test') {
    headers.token = 'dWlkPTExMDkwOCZsb25naXR1ZGU9MTE5LjQyNSZsYXRpdHVkZT0zMi4xODk1OSZzaWduPUI1ODkzMzZDRTYxMDdDNEQ5Njk3RDQzN0U4MUIwODFG';
  } else {
    headers.token = ctx.request.header.token;
  }

  var configSelf = Object.assign(conf, {
    baseURL: config.api_url,
    timeout: 10000,
    headers: headers
  });
  return new Promise(function (resolve, reject) {
    axios(configSelf).then(function (res) {
      // console.log(res.data.code, 'res');
      if (Number(res.data.code) === 0) {
        resolve(_objectSpread(_objectSpread({}, res.data), {}, {
          code: Number(res.data.code)
        }));
      } else {
        if (ctx === 'test') {// console.log('test错误');
          // reject({
          //     code: res.data.code,
          //     msg: res.data.msg,
          // });
        }

        resolve({
          code: res.data.code,
          msg: res.data.msg
        });
      }
    })["catch"](function (err) {
      reject(err);
    });
  });
};

module.exports = request;