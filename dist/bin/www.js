"use strict";

/**
 * Module dependencies.
 */
var app = require('../app');

var tools = require('../utils/tools');

var config = require('../config/index');

var logger = require('../logs/logs');

var _require = require('../utils/utils'),
    getIpAddress = _require.getIpAddress;
/**
 * Get port from environment and store in Express.
 */


var host = config.HOST || 'localhost';
var port = tools.normalizePort(config.PORT || '8000');
/**
 * Listen on provided port, on all network interfaces.
 */

app.listen(port, host, function () {
  logger.development("\u5F53\u524D\u8FD0\u884C\u73AF\u5883-->".concat(config.NODE_ENV));
  logger.development("\u670D\u52A1\u6B63\u8FD0\u884C\u5728 http://".concat(host, ":").concat(port));
  logger.development("ip: http://".concat(getIpAddress(), ":").concat(port));
});