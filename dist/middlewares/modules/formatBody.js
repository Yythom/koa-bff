"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @desc 响应数据格式化输出中间件(在router前调用)
 * @author yyt
 * @date 2020/5/12
 */
module.exports = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return next();

          case 3:
            // 执行路由
            if (ctx.body) {
              ctx.body = {
                code: ctx.response.status,
                success: true,
                message: 'success',
                data: ctx.body
              };
            } else {
              ctx.body = {
                code: ctx.response.status,
                success: true,
                message: 'success'
              };
            }

            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            ctx.response.status = _context.t0.response.status;
            ctx.body = {
              success: false,
              message: _context.t0.response.data.text
            };

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();