"use strict";

var _index = _interopRequireDefault(require("../../api/index"));

var _utils = require("../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = {
  login: function () {
    var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      var data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              data = ctx.request.body; // const result = await api.login.loginApi(data, ctx);
              // console.log(result, 'result');

              ctx.body = {
                result: _objectSpread(_objectSpread({}, data), {}, {
                  list: data.page < 3 ? [1, 2, 3, 4, 5, 6, 7] : []
                }),
                code: 0
              };

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function login(_x, _x2) {
      return _login.apply(this, arguments);
    }

    return login;
  }(),
  sku: function () {
    var _sku = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
      var names, colors, storages;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // const result = await api.login.userInfoApi(ctx);
              names = ['iphone X', 'iphone XS'];
              colors = ['黑色', '白色'];
              storages = ['64g', '256g'];
              ctx.body = (0, _utils.combine)(names, colors, storages);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function sku(_x3, _x4) {
      return _sku.apply(this, arguments);
    }

    return sku;
  }()
};