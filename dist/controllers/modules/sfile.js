"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _path = _interopRequireDefault(require("path"));

var _stream = require("stream");

var _fsExtra = _interopRequireWildcard(require("fs-extra"));

var _utils = require("../../utils/utils");

var _config = _interopRequireDefault(require("../../config"));

var _s_file = require("../../utils/file/s_file");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var pipeStream = function pipeStream(filePath, ws) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var unlink = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  return new Promise(function (resolve, reject) {
    // 通过pipeline利用stream背压机制避免阻塞、提升读写效率
    var rs = _fsExtra["default"].createReadStream(filePath, options);

    (0, _stream.pipeline)(rs, ws, function (err) {
      if (err) return reject(err);
      unlink && _fsExtra["default"].unlink(filePath); // 默认情况写完后删除读取的文件

      resolve(); // 读写结束时Promise变为fulfilled状态

      return true;
    });
  });
};

var mergeChunks = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(filename) {
    var size,
        filePath,
        exist,
        chunksDir,
        chunkFiles,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            size = _args.length > 1 && _args[1] !== undefined ? _args[1] : _s_file.DEFAULT_SIZE;
            filePath = _path["default"].join(_s_file.PUBLIC_DIR, filename); // 合并后的文件写入的位置

            _context.next = 4;
            return _fsExtra["default"].pathExists(filePath);

          case 4:
            exist = _context.sent;

            if (exist) {
              _context.next = 8;
              break;
            }

            _context.next = 8;
            return _fsExtra["default"].createFile(filePath);

          case 8:
            chunksDir = _path["default"].join(_s_file.TMP_DIR, filename); // 存放分片的目录

            _context.next = 11;
            return _fsExtra["default"].readdir(chunksDir);

          case 11:
            chunkFiles = _context.sent;
            // 获取分片文件名称数组。
            chunkFiles.sort(function (a, b) {
              return +a.split('-')[1] - +b.split('-')[1];
            }); // 合并之前按照升序排序，避免出错。

            _context.next = 15;
            return Promise.all(chunkFiles.map(function (chunkFile, index) {
              return pipeStream(_path["default"].join(chunksDir, chunkFile), _fsExtra["default"].createWriteStream(filePath, {
                start: index * size,
                flags: 'r+' // 必须改为'r+'。默认是'w'，即截断式，如果分片较少时，通过promise.all进行并发写入时，writestream打开状态可以有两到三个(根据硬件性能决定)工作线程进行并行写入，此时可以成功写入；但是分片稍多时，会因为截断而导致前面写入的内容丢失从而导致文件内容不正确。

              }));
            }));

          case 15:
            _fsExtra["default"].emptyDir(chunksDir, function (err) {
              // 合并结束后删除存放分片文件的目录
              if (err) return console.error('Meet some error while remove sub file or directory:', err);

              _fsExtra["default"].rmdirSync(chunksDir);

              return true;
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function mergeChunks(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  s_upload: function () {
    var _s_upload = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
      var _ctx$params, filename, chunkName, _start, start, chunkDir, exist, chunkFilePath, ws;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              ctx.set('Content-Type', 'application/octet-stream'); // filename为文件名称，也是存放分片文件的文件夹的名称；
              // chunk_name为分片文件名称；
              // start为分片文件写入时的开始位置——为了实现断点续传、暂停/恢复

              _ctx$params = ctx.params, filename = _ctx$params.filename, chunkName = _ctx$params.chunk_name, _start = _ctx$params.start;
              start = +_start;
              chunkDir = _path["default"].join(_s_file.TMP_DIR, filename); // 分片文件保存的路径
              // console.log('params', ctx.params);

              _context2.next = 6;
              return _fsExtra["default"].pathExists(chunkDir);

            case 6:
              exist = _context2.sent;

              if (!exist) {
                // 分片文件目录不存在则先创建它
                _fsExtra["default"].mkdirs(chunkDir);
              }

              chunkFilePath = _path["default"].join(chunkDir, chunkName);
              ws = _fsExtra["default"].createWriteStream(chunkFilePath, {
                start: start,
                flags: 'a'
              }); // 创建写入分片文件的WriteStream

              ctx.req.on('end', function () {
                // 写入结束时关闭写入流并返回成功的响应
                ws.close();
                ctx.body = {
                  success: true
                };
              });
              ctx.req.on('close', function () {
                console.log('close');
                return ws.close();
              }); // 中断(暂停或取消)时主动关闭分片写入流

              ctx.req.on('error', function (err) {
                // 发生错误时现关闭写入流再交给后续处理错误的中间件处理。
                // console.log(err, 'error');
                ws.close();
                next(err);
              });
              ctx.req.pipe(ws);
              ctx.body = {
                needUpload: true
              };

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function s_upload(_x2, _x3) {
      return _s_upload.apply(this, arguments);
    }

    return s_upload;
  }(),
  verify: function () {
    var _verify = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx, next) {
      var filename, filePath, existFile, tempDir, exist, uploadList;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              filename = ctx.params.filename;
              filePath = _path["default"].join(_s_file.PUBLIC_DIR, filename); // 合并后的文件的路径

              _context4.next = 4;
              return _fsExtra["default"].pathExists(filePath);

            case 4:
              existFile = _context4.sent;

              if (!existFile) {
                _context4.next = 8;
                break;
              }

              // 判断是否上传过(指定文件是否已经合并)
              ctx.body = {
                success: true,
                needUpload: false,
                url: "".concat("".concat(_s_file.http).concat((0, _utils.getIpAddress)(), ":").concat(_config["default"].PORT), "/file?url=", encodeURIComponent(filename))
              };
              return _context4.abrupt("return");

            case 8:
              tempDir = _path["default"].join(_s_file.TMP_DIR, filename); // 存放分片文件的路径

              _context4.next = 11;
              return _fsExtra["default"].pathExists(tempDir);

            case 11:
              exist = _context4.sent;
              uploadList = [];

              if (!exist) {
                _context4.next = 20;
                break;
              }

              _context4.next = 16;
              return _fsExtra["default"].readdir(tempDir);

            case 16:
              uploadList = _context4.sent;
              _context4.next = 19;
              return Promise.all(uploadList.map( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(chunk_name) {
                  var stat;
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return _fsExtra["default"].stat(_path["default"].join(tempDir, chunk_name));

                        case 2:
                          stat = _context3.sent;
                          return _context3.abrupt("return", {
                            chunk_name: chunk_name,
                            // 分片文件名称
                            size: stat.size // 已经写入的大小

                          });

                        case 4:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function (_x6) {
                  return _ref2.apply(this, arguments);
                };
              }()));

            case 19:
              uploadList = _context4.sent;

            case 20:
              ctx.body = {
                success: true,
                needUpload: true,
                // 需要继续上传
                uploadList: uploadList // 保存已上传的分片的信息的数组

              };

            case 21:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function verify(_x4, _x5) {
      return _verify.apply(this, arguments);
    }

    return verify;
  }(),
  merge: function () {
    var _merge = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ctx, next) {
      var _ctx$params2, filename, size, url;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _ctx$params2 = ctx.params, filename = _ctx$params2.filename, size = _ctx$params2.size;
              _context5.next = 3;
              return mergeChunks(filename, +size);

            case 3:
              // 进行文件合并，size表示分片文件的大小
              url = "".concat("".concat(_s_file.http).concat((0, _utils.getIpAddress)(), ":").concat(_config["default"].PORT), "/file?url=", encodeURIComponent(filename));
              ctx.body = {
                success: true,
                url: url
              };

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function merge(_x7, _x8) {
      return _merge.apply(this, arguments);
    }

    return merge;
  }()
};