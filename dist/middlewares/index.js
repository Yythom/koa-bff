"use strict";

var requireIndex = require('es6-requireindex');

var middleswares = {};
var modulesFiles = requireIndex(__dirname).modules;
Object.keys(modulesFiles).forEach(function (item) {
  middleswares[item] = modulesFiles[item];
});
module.exports = middleswares;