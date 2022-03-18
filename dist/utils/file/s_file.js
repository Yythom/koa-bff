"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.http = exports.getVersion = exports.TMP_DIR = exports.PUBLIC_DIR = exports.DEFAULT_SIZE = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var TMP_DIR = _path["default"].join(__dirname, '../../../public/tmp/');

exports.TMP_DIR = TMP_DIR;
var http = 'http://';
exports.http = http;

var PUBLIC_DIR = _path["default"].join(__dirname, '../../../public/uploads/');

exports.PUBLIC_DIR = PUBLIC_DIR;
var DEFAULT_SIZE = 80 * 1024 * 1024;
exports.DEFAULT_SIZE = DEFAULT_SIZE;
var olds = '1.8.1';
var news = '1.8.3';

var getVersion = /*#__PURE__*/function () {
  function getVersion() {
    _classCallCheck(this, getVersion);
  }

  _createClass(getVersion, null, [{
    key: "splitVersion",
    value: function splitVersion(oldval, newval, oldCode, reqCode) {
      // 校验是否传入参数
      if (!oldval || !newval) {
        console.error('[传入参数不完整!]');
        return false;
      } // 校验参数是否为string


      if (typeof oldval !== 'string' || typeof newval !== 'string') {
        console.error('[请传入字符串类型!]');
        return false;
      } // 检测字母


      var alpA = this.checkAlphabet(oldval);
      var alpB = this.checkAlphabet(newval); // 过滤掉版本字母

      var version = null;
      var visA = oldval.split(/\.|\D/);
      var visB = newval.split(/\.|\D/); // 含字母时重组, 格式需固定
      // 不允许出现单个字母形式1.2.1 | 1.2.1a

      if (alpA && alpB) {
        visA[visA.length - 1] = alpA;
        visB[visB.length - 1] = alpB;
      }

      this.replaceArry(visA);
      this.replaceArry(visB);
      this.coverZero(visA, visB);
      version = this.checkVersion(visA, visB, oldval, newval, oldCode, reqCode);
      console.log(version);
      return version;
    } // 比较版本

  }, {
    key: "checkVersion",
    value: function checkVersion(visA, visB, oldval, newval, oldCode, reqCode) {
      var obj = {
        isupgrad: false,
        str: "\u5DF2\u7ECF\u6700\u65B0 : ".concat(oldval, " ").concat(oldCode)
      };

      for (var i in visA) {
        for (var j in visB) {
          if (i === j) {
            if (parseInt(visA[i], 10) < parseInt(visB[j], 10)) {
              obj.isupgrad = true;
              obj.str = "\u6700\u65B0\u7248\u672C : ".concat(newval, " ").concat(reqCode);
            }

            if (parseInt(visA[i], 10) > parseInt(visB[j], 10)) {
              obj.isupgrad = true;
              obj.str = "\u5DF2\u7ECF\u6700\u65B0 : ".concat(oldval, " ").concat(oldCode);
            }
          }
        }
      }

      if (!obj.isupgrad) {
        if (oldCode < reqCode) {
          obj.isupgrad = true;
          obj.str = "\u6700\u65B0\u7248\u672C : ".concat(newval, " ").concat(reqCode);
        }
      }

      return obj;
    } // 替换空元素

  }, {
    key: "replaceArry",
    value: function replaceArry(item) {
      for (var i in item) {
        if (item[i] === '') {
          item[i] = '0';
        }
      }
    } // 补全数组长度

  }, {
    key: "coverZero",
    value: function coverZero(visA, visB) {
      var lenA = visA.length;
      var lenB = visB.length;

      if (lenA === lenB) {
        return false;
      }

      var minVal = lenA > lenB ? lenB : lenA;
      var maxVal = lenA > lenB ? lenA : lenB;
      var aryVal = lenA > lenB ? visB : visA;

      for (var i = minVal; i < maxVal; i++) {
        aryVal.push('0');
      }
    } // 校验字母

  }, {
    key: "checkAlphabet",
    value: function checkAlphabet(item) {
      var reg = /^[A-Za-z]+$/;
      var len = item.length - 1;
      var lastNode = item[len];

      if (reg.test(lastNode)) {
        // 转化, 规定默认b > a
        return item.charCodeAt(len).toString();
      }
    }
  }]);

  return getVersion;
}(); // 调用


exports.getVersion = getVersion;