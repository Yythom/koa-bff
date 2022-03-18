"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _nodeApk = require("node-apk");

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireWildcard(require("fs-extra"));

var _crypto = _interopRequireDefault(require("crypto"));

var _s_file = require("../../utils/file/s_file");

var _utils = require("../../utils/utils");

var _config = _interopRequireDefault(require("../../config"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var AppInfoParser = require('app-info-parser');

module.exports = {
  upgrade: function () {
    var _upgrade = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      var _ctx$request$query, code, version, fileList, apkHashName, index, element, filePath, DownloadUrl, is, apk, _fs$statSync, size, buffer, hash, md5, parser, appInfo, initJson, check;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // 'af77e496e920883de939dc1d7c17fb65.apk'
              _ctx$request$query = ctx.request.query, code = _ctx$request$query.code, version = _ctx$request$query.version;
              console.log(code, version, '-----');
              _context.next = 4;
              return _fsExtra["default"].readdir(_s_file.PUBLIC_DIR);

            case 4:
              fileList = _context.sent;
              apkHashName = '';

              for (index = 0; index < fileList.length; index++) {
                element = fileList[index];
                if (element.indexOf('apk') !== -1) apkHashName = element;
              }

              filePath = _path["default"].resolve(_s_file.PUBLIC_DIR, apkHashName); // 合并后的文件写入的位置

              console.log(filePath, 'filePath');
              DownloadUrl = "".concat("".concat(_s_file.http).concat((0, _utils.getIpAddress)(), ":").concat(_config["default"].PORT), "/file?url=", encodeURIComponent(apkHashName));
              is = _fsExtra["default"].existsSync(filePath);

              if (!is) {
                _context.next = 30;
                break;
              }

              apk = new _nodeApk.Apk(filePath);
              _fs$statSync = _fsExtra["default"].statSync(filePath), size = _fs$statSync.size;
              buffer = _fsExtra["default"].readFileSync(filePath);
              hash = _crypto["default"].createHash('md5');
              hash.update(buffer, 'utf8');
              md5 = hash.digest('hex'); // const appInfo = {};
              // const appInfo = await apk.getManifestInfo();
              // console.log(appInfo, 'appInfo');

              console.log(size, 'size');
              parser = new AppInfoParser(filePath);
              _context.next = 22;
              return parser.parse();

            case 22:
              appInfo = _context.sent;
              // console.log(info.);
              initJson = {
                Code: 0,
                Msg: '',
                UpdateStatus: 0,
                VersionCode: appInfo === null || appInfo === void 0 ? void 0 : appInfo.versionCode,
                VersionName: appInfo === null || appInfo === void 0 ? void 0 : appInfo.versionName,
                UploadTime: ' ',
                ModifyContent: '',
                DownloadUrl: '',
                ApkSize: size / 1024,
                ApkMd5: md5
              };
              check = _s_file.getVersion.splitVersion("".concat(version), appInfo.versionName, code, appInfo.versionCode);

              if (check.isupgrad) {
                initJson.ModifyContent = '\r\n1、您当前的App版本过低，为了给您提供更好的体验，请将您的App更新至最新版本';
                initJson.UpdateStatus = 1;
                initJson.DownloadUrl = DownloadUrl;
              }

              apk.close();
              ctx.body = initJson;
              _context.next = 31;
              break;

            case 30:
              ctx.body = 'apk未找到';

            case 31:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function upgrade(_x, _x2) {
      return _upgrade.apply(this, arguments);
    }

    return upgrade;
  }()
};