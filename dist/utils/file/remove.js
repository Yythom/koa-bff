"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function remove(tarPath, cb) {
  _fs["default"].stat(tarPath, function (err, states) {
    if (err) {
      cb();
      return;
    }

    if (states.isDirectory()) {
      _fs["default"].readdir(tarPath, function (err, files) {
        if (err) {
          console.log('ok2');
          cb();
          return;
        }

        files.forEach(function (file) {
          remove(_path["default"].join(tarPath, file), cb);
        });
      });
    } else {
      _fs["default"].unlink(tarPath, function (err) {
        if (err) {
          console.log(err);
        }

        cb();
      });
    }
  });
}

var _default = remove;
exports["default"] = _default;