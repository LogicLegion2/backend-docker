"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrder = exports.captureOrder = exports.cancelOrder = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = require("express");
var _config = require("../config/enviroment/config");
var _axios = _interopRequireDefault(require("axios"));
/**
 * Este es el controlador de payment
 * @module ctr-payment
 */

var urlFrontend = process.env.FRONTEND_URL;
/**
 * Crea una nueva orden de compra con la API de PayPal
 * @param {object} req - Objeto de solicitud HTTP, que contiene la información de la petición.
 * @param {object} res - Objeto de respuesta HTTP, que se utiliza para enviar una respuesta al cliente.
 */
var createOrder = exports.createOrder = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var totalGlobal, order, params, _yield$axios$post, access_token, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          totalGlobal = req.body.totalGlobal;
          order = {
            intent: "CAPTURE",
            purchase_units: [{
              amount: {
                currency_code: "USD",
                value: totalGlobal
              }
            }],
            application_context: {
              brand_name: "Barber's Brothers",
              landing_page: "NO_PREFERENCE",
              user_action: "PAY_NOW",
              return_url: "".concat(_config.HOST, "/capture-order"),
              cancel_url: "".concat(_config.HOST, "/cancel-order")
            }
          };
          params = new URLSearchParams();
          params.append('grant_type', 'client_credentials');
          _context.next = 6;
          return _axios["default"].post("".concat(_config.PAYPAL_API, "/v1/oauth2/token"), params, {
            auth: {
              username: _config.PAYPAL_API_CLIENT,
              password: _config.PAYPAL_API_SECRET
            }
          });
        case 6:
          _yield$axios$post = _context.sent;
          access_token = _yield$axios$post.data.access_token;
          _context.next = 10;
          return _axios["default"].post("".concat(_config.PAYPAL_API, "/v2/checkout/orders"), order, {
            headers: {
              Authorization: "Bearer ".concat(access_token)
            }
          });
        case 10:
          response = _context.sent;
          return _context.abrupt("return", res.json(response.data));
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createOrder(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Captura una nueva orden de compra con la API de PayPal
 * @param {object} req - Objeto de solicitud HTTP, que contiene la información de la petición.
 * @param {object} res - Objeto de respuesta HTTP, que se utiliza para enviar una respuesta al cliente.
 */

var captureOrder = exports.captureOrder = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var token, response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          token = req.query.token;
          _context2.next = 3;
          return _axios["default"].post("".concat(_config.PAYPAL_API, "/v2/checkout/orders/").concat(token, "/capture"), {}, {
            auth: {
              username: _config.PAYPAL_API_CLIENT,
              password: _config.PAYPAL_API_SECRET
            }
          });
        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", res.redirect("".concat(urlFrontend, "/cliente/carrito?status=success")));
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function captureOrder(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Cancela una nueva orden de compra con la API de PayPal
 * @param {object} req - Objeto de solicitud HTTP, que contiene la información de la petición.
 * @param {object} res - Objeto de respuesta HTTP, que se utiliza para enviar una respuesta al cliente.
 */
var cancelOrder = exports.cancelOrder = function cancelOrder(req, res) {
  return res.redirect("".concat(urlFrontend, "/cliente/comprar?status=error"));
};