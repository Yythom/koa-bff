"use strict";

var _axios = _interopRequireDefault(require("axios"));

var _mapConfig = _interopRequireDefault(require("../../utils/mapConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = {
  getLocationDetail: function () {
    var _getLocationDetail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      var data, url, res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              data = ctx.request.body;
              url = "https://apis.map.qq.com/ws/geocoder/v1/?address=".concat(encodeURIComponent(data.address), "&get_poi=1&poi_options=radius=1000&key=").concat(_mapConfig["default"].LOCATION_KEY);
              _context.next = 4;
              return _axios["default"].get(url);

            case 4:
              res = _context.sent;

              if (res.data.status === 0) {
                ctx.body = _objectSpread({
                  code: 0
                }, res.data);
              } else {
                ctx.body = {
                  code: false,
                  msg: '地址请求错误'
                };
              }

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getLocationDetail(_x, _x2) {
      return _getLocationDetail.apply(this, arguments);
    }

    return getLocationDetail;
  }(),
  getLocation: function () {
    var _getLocation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
      var data, url, res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              data = ctx.request.body;
              url = "https://apis.map.qq.com/ws/geocoder/v1/?location=".concat(data.lat, ",").concat(data.lng, "&key=").concat(_mapConfig["default"].LOCATION_KEY);
              _context2.next = 4;
              return _axios["default"].get(url);

            case 4:
              res = _context2.sent;

              if (res.data.status === 0) {
                ctx.body = _objectSpread({
                  code: 0
                }, res.data);
              } else {
                ctx.body = {
                  code: false,
                  msg: '地址请求错误'
                };
              }

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getLocation(_x3, _x4) {
      return _getLocation.apply(this, arguments);
    }

    return getLocation;
  }(),
  polyLine: function () {
    var _polyLine = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx, next) {
      var data, url, res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              data = ctx.request.body;
              url = "https://apis.map.qq.com/ws/direction/v1/bicycling/?from=".concat(data.from, "&to=").concat(data.to, "&key=").concat(_mapConfig["default"].LOCATION_KEY);
              _context3.next = 4;
              return _axios["default"].get(url);

            case 4:
              res = _context3.sent;

              if (res.data.status === 0) {
                ctx.body = _objectSpread({
                  code: 0
                }, res.data);
              } else {
                ctx.body = {
                  code: false,
                  msg: '地址请求错误'
                };
              }

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function polyLine(_x5, _x6) {
      return _polyLine.apply(this, arguments);
    }

    return polyLine;
  }(),
  locationKeyword: function () {
    var _locationKeyword = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx, next) {
      var data, url, res;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              data = ctx.request.body;
              url = "https://apis.map.qq.com/ws/place/v1/suggestion/?keyword=".concat(encodeURIComponent(data.keyword), "&page_index=1&page_size=20&key=").concat(_mapConfig["default"].LOCATION_KEY);
              _context4.next = 4;
              return _axios["default"].get(url);

            case 4:
              res = _context4.sent;

              if (res.data.status === 0) {
                ctx.body = _objectSpread({
                  code: 0
                }, res.data);
              } else {
                ctx.body = {
                  code: false,
                  msg: '地址请求错误'
                };
              }

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function locationKeyword(_x7, _x8) {
      return _locationKeyword.apply(this, arguments);
    }

    return locationKeyword;
  }(),
  searchAround: function () {
    var _searchAround = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ctx, next) {
      var data, url, res;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              data = ctx.request.body;
              url = "https://apis.map.qq.com/ws/place/v1/search?boundary=nearby(".concat(data.location, ",").concat(data.distance || 1000, ")&keyword=").concat(encodeURIComponent(data.keyword), "&page_size=20&page_index=1&key=").concat(_mapConfig["default"].LOCATION_KEY);
              _context5.next = 4;
              return _axios["default"].get(url);

            case 4:
              res = _context5.sent;

              if (res.data.status === 0) {
                ctx.body = _objectSpread({
                  code: 0
                }, res.data);
              } else {
                ctx.body = {
                  code: false,
                  msg: '地址请求错误'
                };
              }

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function searchAround(_x9, _x10) {
      return _searchAround.apply(this, arguments);
    }

    return searchAround;
  }(),
  tsLocation: function () {
    var _tsLocation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(ctx, next) {
      var data, url, res;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              data = ctx.request.body;
              url = "https://apis.map.qq.com/ws/coord/v1/translate?locations=".concat(data.lat, ",").concat(data.lng, "&type=3&key=").concat(_mapConfig["default"].LOCATION_KEY);
              _context6.next = 4;
              return _axios["default"].get(url);

            case 4:
              res = _context6.sent;

              if (res.data.status === 0) {
                ctx.body = _objectSpread({
                  code: 0
                }, res.data);
              } else {
                ctx.body = {
                  code: false,
                  msg: '地址请求错误'
                };
              }

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function tsLocation(_x11, _x12) {
      return _tsLocation.apply(this, arguments);
    }

    return tsLocation;
  }()
};