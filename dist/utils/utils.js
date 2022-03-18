"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combine = combine;
exports.getIpAddress = getIpAddress;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable guard-for-in */

/* eslint-disable no-plusplus */

/* eslint-disable func-names */

/* eslint-disable import/prefer-default-export */

/* eslint-disable indent */

/* eslint-disable no-restricted-syntax */
var os = require('os');

function combine() {
  for (var _len = arguments.length, chunks = new Array(_len), _key = 0; _key < _len; _key++) {
    chunks[_key] = arguments[_key];
  }

  var res = [];

  var helper = function helper(chunkIndex, prev) {
    var chunk = chunks[chunkIndex];
    var isLast = chunkIndex === chunks.length - 1;
    var str;

    var _iterator = _createForOfIteratorHelper(chunk),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var val = _step.value;
        var cur = prev.concat(val);

        if (isLast) {
          res.push(cur.join(';'));
        } else {
          helper(chunkIndex + 1, cur);
        }
      } // console.log(str);

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  helper(0, []);
  return res;
} // 获取ip地址


function getIpAddress() {
  var interfaces = os.networkInterfaces();

  for (var dev in interfaces) {
    var iface = interfaces[dev];

    for (var i = 0; i < iface.length; i++) {
      var _iface$i = iface[i],
          family = _iface$i.family,
          address = _iface$i.address,
          internal = _iface$i.internal;

      if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
        if (address.indexOf('10.0.4.16') !== -1) {
          console.log(address, 'address');
          return '49.234.41.182';
        }

        return address;
      }
    }
  }

  return '';
}