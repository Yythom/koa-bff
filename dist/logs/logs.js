"use strict";

var _config = _interopRequireDefault(require("../config"));

var _log = _interopRequireDefault(require("../config/log.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var log4js = require('log4js');
/**
 * @desc 记录器对象(日志输出配置)
 * @author yyt
 * @date 2020/5/12
 */


log4js.configure(_log["default"]);
var defaultLogger = log4js.getLogger('default');
var developmentLogger = log4js.getLogger('development');
var productionLogger = log4js.getLogger('production');
var errorLogger = log4js.getLogger('error');
var accessLogger = log4js.getLogger('access');
var logger = {};
/**
 * @desc 格式化请求日志
 * @author yyt
 * @date 2020/5/12
 */

var formatReqLog = function formatReqLog(req, resTime) {
  var logText = '';
  var method = req.method; // 访问方法

  logText += "request method: ".concat(method, "\n"); // 请求原始地址

  logText += "request originalUrl:  ".concat(req.originalUrl, "\n"); // 客户端ip

  logText += "request client ip:  ".concat(req.ip, "\n"); // 请求参数

  if (method === 'GET' || method === 'get') {
    logText += 'response query: \n'.concat(" ", JSON.stringify(req.query), "\n");
  } else {
    logText += 'response body: \n'.concat(JSON.stringify(req.body), "\n");
  } // 服务器响应时间


  logText += "response time: ".concat(resTime, "ms\n");
  return logText;
};
/**
 * @desc 格式化请求响应日志
 * @author yyt
 * @date 2020/5/12
 */


var formatAccessLog = function formatAccessLog(ctx, resTime) {
  var logText = ''; // 响应日志开始

  logText += '\n*************** access log start ***************\n'; // 添加请求日志

  logText += formatReqLog(ctx.request, resTime); // 响应状态码

  logText += "response status: ".concat(ctx.status, "\n"); // 响应内容

  logText += 'response body: \n'.concat(JSON.stringify(ctx.body), "\n"); // 响应日志结束

  logText += '*************** access log end ***************\n';
  return logText;
}; // 格式化请求头


logger.formatHead = function (ctx) {
  var str = '';
  Object.keys(ctx.request.header).forEach(function (e) {
    str += "".concat(e, "\uFF1A").concat(ctx.request.header[e], "\n        ");
  });
  var err = {
    name: ctx.body.code,
    message: ctx.body.msg,
    stack: "\n  header:\n        ".concat(str, " \n  method: ").concat(JSON.stringify(ctx.request.method), "\n  url:    ").concat(_config["default"].api_url + ctx.request.url, "\n        ")
  };
  return err;
}; // 格式化错误日志


var formatError = function formatError(ctx, err) {
  var resTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var logText = ''; // 错误信息开始

  logText += '\n*************** error log start ***************\n'; // 添加请求日志

  logText += formatReqLog(ctx.request, resTime); // 错误名称

  logText += "err name: ".concat(err.name, "\n"); // 错误信息

  logText += "err message: ".concat(err.message, "\n"); // 错误详情

  logText += "err stack: ".concat(err.stack, "\n"); // 错误信息结束

  logText += '*************** error log end ***************\n';
  return logText;
}; // 封装error异常日志


logger.errorLog = function (ctx, error, resTime) {
  if (ctx && error) {
    errorLogger.error(formatError(ctx, error, resTime));
  }
}; // 封装access日志


logger.accessLog = function (ctx, resTime) {
  if (ctx) {
    accessLogger.info(formatAccessLog(ctx, resTime));
  }
}; // 封装开发日志


logger.development = function (ctx) {
  developmentLogger.debug(ctx);
}; // 封装日常日志(生产)


logger.production = function (ctx) {
  productionLogger.mark(ctx);
};

module.exports = logger;