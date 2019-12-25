"use strict";

exports.__esModule = true;

var cli_color_1 = require("cli-color");

var errorLogger = function errorLogger(message) {
  console.error("gridsome-plugin-manifest: " + cli_color_1.red(message));
};

exports["default"] = errorLogger;