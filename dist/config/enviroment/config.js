"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PORT = exports.PAYPAL_API_SECRET = exports.PAYPAL_API_CLIENT = exports.PAYPAL_API = exports.HOST = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var PORT = exports.PORT = 3000;
var HOST = exports.HOST = "https://backend-production-64de.up.railway.app";
var PAYPAL_API_CLIENT = exports.PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
var PAYPAL_API_SECRET = exports.PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;
var PAYPAL_API = exports.PAYPAL_API = "https://api-m.sandbox.paypal.com";