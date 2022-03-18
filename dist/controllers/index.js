"use strict";

var requireIndex = require('es6-requireindex');

var controllers = {};
var modulesFiles = requireIndex(__dirname).modules;
Object.keys(modulesFiles).forEach(function (item) {
  controllers[item] = modulesFiles[item];
});
module.exports = controllers;