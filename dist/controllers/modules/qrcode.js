"use strict";

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _jimp = _interopRequireDefault(require("jimp"));

var _qrcodeReader = _interopRequireDefault(require("qrcode-reader"));

var _remove = _interopRequireDefault(require("../../utils/file/remove"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var decodeImage = _jimp["default"].read;

var savePath = _path["default"].join(__dirname, '../../../public/uploads/'); // qrDecode("123.png", function (data) {
//     console.log(data);
// });


var qrDecode = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              decodeImage(data, function (err, image) {
                if (err) {
                  resolve(err);
                  return;
                }

                var decodeQR = new _qrcodeReader["default"]();

                decodeQR.callback = function (errorWhenDecodeQR, result) {
                  if (errorWhenDecodeQR) {
                    resolve('errorWhenDecodeQR');
                    return;
                  }

                  if (!result) {
                    resolve(false);
                  } else {
                    resolve(result.result);
                  }
                };

                decodeQR.decode(image.bitmap);
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function qrDecode(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  qrcode: function () {
    var _qrcode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
      var files, res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              files = ctx.request.files; // console.log(files, 'ctx.request');

              _context2.prev = 1;
              _context2.next = 4;
              return new Promise(function (resolve) {
                var filesData = {};
                Object.keys(files).forEach(function (key, index) {
                  var file = files[key];
                  if (!key) resolve('上传文件不存在');
                  var fileName = "".concat(file.name);
                  var filePath = "".concat(savePath).concat(encodeURIComponent(fileName));

                  var upStream = _fsExtra["default"].createWriteStream(filePath);

                  _fsExtra["default"].createReadStream(file.path).pipe(upStream);

                  var stream = _fsExtra["default"].readFileSync(file.path);

                  qrDecode(filePath).then(function (code) {
                    filesData[fileName] = code;

                    if (index === Object.keys(files).length - 1) {
                      resolve(filesData);
                      setTimeout(function () {
                        (0, _remove["default"])(filePath, function () {});
                      }, 200);
                    }
                  });
                });
              });

            case 4:
              res = _context2.sent;
              ctx.body = res;
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              ctx.body = _context2.t0;

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 8]]);
    }));

    function qrcode(_x2, _x3) {
      return _qrcode.apply(this, arguments);
    }

    return qrcode;
  }()
};