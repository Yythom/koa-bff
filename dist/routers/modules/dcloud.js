"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(router, middleware, controller) {
  // 注册路由
  router.get('/dcloud/upgrade', controller.dcloud.upgrade);
};

exports["default"] = _default;