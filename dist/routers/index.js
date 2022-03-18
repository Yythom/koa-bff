"use strict";

var requireIndex = require('es6-requireindex');

var controller = require('../controllers');

var middleware = require('../middlewares');

var modulesFiles = requireIndex(__dirname).modules;

module.exports = function (router) {
  Object.keys(modulesFiles).forEach(function (item) {
    modulesFiles[item](router, middleware, controller);
  });
};