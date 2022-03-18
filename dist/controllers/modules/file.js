"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _axios = _interopRequireDefault(require("axios"));

var _formData = _interopRequireDefault(require("form-data"));

var _mimeTypes = _interopRequireDefault(require("mime-types"));

var _stream = _interopRequireDefault(require("stream"));

var _index = _interopRequireDefault(require("../../api/index"));

var _remove = _interopRequireDefault(require("../../utils/file/remove"));

var _config = _interopRequireDefault(require("../../config"));

var _utils = require("../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var savePath = _path["default"].resolve(__dirname, '../../../public/uploads/');

var http = 'http://';
module.exports = {
  upload: function () {
    var _upload = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      var files, res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              files = ctx.request.files;
              if (!files) ctx.body = '上传文件不存在'; // console.log(files, 'files');

              console.log(savePath, 'savePath');
              ctx.body = '上传文件不存在';
              _context.next = 6;
              return new Promise(function (resolve) {
                var filesData = {};
                Object.keys(files).forEach(function (key, index) {
                  var file = files[key];
                  if (!key) resolve('上传文件不存在');
                  var fileName = "".concat(file.name);
                  var filePath = "".concat(savePath).concat(encodeURIComponent(fileName));

                  var upStream = _fs["default"].createWriteStream(filePath);

                  _fs["default"].createReadStream(file.path).pipe(upStream);

                  var stream = _fs["default"].readFileSync(file.path);

                  var form = new _formData["default"]();
                  form.append('blob', stream);

                  _index["default"].file.upload(form, ctx).then(function (_res) {
                    var opt = {};
                    opt.result = _res;
                    opt.url = "".concat("".concat(http).concat((0, _utils.getIpAddress)(), ":").concat(_config["default"].PORT), "/file?url=", encodeURIComponent(fileName));
                    filesData[file.name] = opt;

                    if (Object.keys(files).length === index + 1) {
                      resolve(_objectSpread({}, filesData));
                    }
                  });
                });
              });

            case 6:
              res = _context.sent;
              ctx.body = res;

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function upload(_x, _x2) {
      return _upload.apply(this, arguments);
    }

    return upload;
  }(),
  del: function () {
    var _del = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
      var res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return new Promise(function (resolve, reject) {
                _fs["default"].readdir(savePath, function (err, files) {
                  console.log(err, files);

                  if (err) {
                    resolve(err);
                  }

                  if (!files[0]) {
                    resolve(0);
                    return;
                  }

                  (0, _remove["default"])(savePath, function () {
                    resolve(files.length);
                  });
                });

                _fs["default"].readdir(_path["default"].join(__dirname, '../../../public/tmp/'), function (err, files) {
                  console.log(err, files);

                  if (err) {
                    resolve(err);
                  }

                  if (!files[0]) {
                    resolve(0);
                    return;
                  }

                  (0, _remove["default"])(savePath, function () {
                    resolve(files.length);
                  });
                });
              });

            case 2:
              res = _context2.sent;
              ctx.body = res;

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function del(_x3, _x4) {
      return _del.apply(this, arguments);
    }

    return del;
  }(),
  get: function () {
    var _get = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx, next) {
      var url, stream;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              url = ctx.request.query.url;
              ctx.set('Content-Type', _mimeTypes["default"].lookup("".concat(savePath, "/").concat(encodeURIComponent(url))));
              stream = _fs["default"].readFileSync("".concat(savePath, "/").concat(encodeURIComponent(url)));
              ctx.body = stream;

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function get(_x5, _x6) {
      return _get.apply(this, arguments);
    }

    return get;
  }(),
  osspost: function () {
    var _osspost = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx, next) {
      var url, Duplex, bufferToStream, res, buf, base64Str;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              bufferToStream = function _bufferToStream(buffer) {
                var stream = new Duplex();
                stream.push(buffer);
                stream.push(null);
                return stream;
              };

              url = ctx.request.body.url;
              Duplex = _stream["default"].Duplex;
              _context4.next = 5;
              return _axios["default"].get(url, {
                responseType: 'arraybuffer'
              }, {
                headers: {
                  'Cache-Control': 'no-cache'
                }
              });

            case 5:
              res = _context4.sent;

              if (res) {
                buf = res.data; // const result = bufferToStream(buf);

                ctx.set('Content-Type', 'image/jpg');
                base64Str = "data:image/jpeg;base64,".concat(buf.toString('base64'));
                ctx.body = base64Str;
              }

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function osspost(_x7, _x8) {
      return _osspost.apply(this, arguments);
    }

    return osspost;
  }()
};