"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _router = _interopRequireDefault(require("@koa/router"));

var _cors = _interopRequireDefault(require("@koa/cors"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaBody = _interopRequireDefault(require("koa-body"));

var _routers = _interopRequireDefault(require("./routers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = new _koa["default"]();
var router = new _router["default"]();

var logger = require('./logs/logs');

var config = require('./config/index'); // 日志中间件


app.use( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
    var start, ms, _ctx$body;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            start = new Date();
            _context.prev = 1;
            _context.next = 4;
            return next();

          case 4:
            ms = new Date() - start;

            if (((_ctx$body = ctx.body) === null || _ctx$body === void 0 ? void 0 : _ctx$body.code) == '0') {
              // console.log(ctx.body, 'ctx');
              logger.accessLog(ctx, ms);
            } else {
              logger.errorLog(ctx, logger.formatHead(ctx), ms);
            }

            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            ms = new Date() - start;
            logger.errorLog(ctx, _context.t0, ms);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // 跨域中间件

app.use((0, _cors["default"])()); // 静态文件托管中间件

if (config.NODE_ENV === 'production') {
  app.use((0, _koaStatic["default"])("".concat(__dirname, "/public")));
} // body解析中间件


app.use((0, _koaBody["default"])({
  multipart: true,
  jsonLimit: '10mb',
  encoding: 'utf-8',
  jsonStrict: true
})); // 路由中间件

app.use(router.routes()).use(router.allowedMethods());
(0, _routers["default"])(router); // error-handling

app.on('error', function (err, ctx) {
  console.error('server error', err, ctx);
});
module.exports = app;