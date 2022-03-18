"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable no-plusplus */
module.exports = {
  test: function () {
    var _test = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      var _ctx$request$query, page, pageSize, arr, index, element;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ctx$request$query = ctx.request.query, page = _ctx$request$query.page, pageSize = _ctx$request$query.pageSize;
              console.log(page, pageSize);
              arr = [];

              for (index = 0; index < pageSize; index++) {
                element = {
                  page: "".concat(page),
                  index: "".concat(index)
                };
                arr.push(element);
              }

              ctx.body = JSON.stringify({
                code: 0,
                data: arr
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function test(_x, _x2) {
      return _test.apply(this, arguments);
    }

    return test;
  }()
};