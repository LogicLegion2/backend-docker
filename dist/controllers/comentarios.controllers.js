"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eliminarComentario = exports.crearComentario = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysqlDb = require("../config/mysql.db.js");
var _dotenv = require("dotenv");
var _promise = _interopRequireDefault(require("mysql2/promise"));
/**
 * Este es el controlador de barbero
 * @module ctr-comentarios
 */

(0, _dotenv.config)();

/**
 * Esta funcion sirve para crear comentarios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var crearComentario = exports.crearComentario = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var idUsuario, idBarbero, comentario, respuesta;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          idUsuario = req.body.idUsuario;
          idBarbero = req.body.idBarbero;
          comentario = req.body.comentario;
          _context.prev = 3;
          _context.next = 6;
          return _mysqlDb.pool.query("CALL LL_INSERTAR_COMENTARIO('".concat(idUsuario, "','").concat(idBarbero, "','").concat(comentario, "');"));
        case 6:
          respuesta = _context.sent;
          res.status(200).json(respuesta);
          _context.next = 13;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](3);
          res.status(500).json(_context.t0);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 10]]);
  }));
  return function crearComentario(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para eliminar comentarios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var eliminarComentario = exports.eliminarComentario = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, respuesta;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.body.id;
          _context2.prev = 1;
          _context2.next = 4;
          return _mysqlDb.pool.query("CALL LL_DESACTIVAR_COMENTARIO('".concat(id, "');"));
        case 4:
          respuesta = _context2.sent;
          res.json(respuesta);
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json(_context2.t0);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return function eliminarComentario(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();