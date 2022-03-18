"use strict";

var development = require('./dev.env');

var production = require('./prod.env'); // 根据不同的NODE_ENV，输出不同的配置对象，默认输出development的配置对象


module.exports = {
  development: development,
  production: production
}[process.env.NODE_ENV || 'development'];