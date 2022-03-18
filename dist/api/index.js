"use strict";

var requireIndex = require('es6-requireindex');

var api = {};
var modulesFiles = requireIndex(__dirname).modules;
Object.keys(modulesFiles).forEach(function (item) {
  api[item] = modulesFiles[item];
});
module.exports = api;