"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.obtenerPregunta = exports.listarPregunta = exports.editarPregunta = exports.desactivarPregunta = exports.crearPregunta = exports.buscarPregunta = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysqlDb = require("../config/mysql.db.js");
var _dotenv = require("dotenv");
var _promise = _interopRequireDefault(require("mysql2/promise"));
/**
 * Este es el controlador de preguntas
 * @module ctr-preguntas
 */

(0, _dotenv.config)();

/**
 * Esta funcion sirve para mostrar todas las preguntas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var listarPregunta = exports.listarPregunta = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _yield$pool$query, _yield$pool$query2, rows;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _mysqlDb.pool.query("CALL LL_VER_PREGUNTAS()");
        case 3:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          rows = _yield$pool$query2[0];
          res.status(200).json({
            preguntas: rows[0]
          });
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          res.status(500).json(_context.t0);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function listarPregunta(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para buscar las preguntas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var buscarPregunta = exports.buscarPregunta = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var desc, _yield$pool$query3, _yield$pool$query4, rows;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          desc = req.query.desc;
          _context2.prev = 1;
          if (desc) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: "Se requiere patrón de búsqueda"
          }));
        case 4:
          _context2.next = 6;
          return _mysqlDb.pool.query("CALL LL_BUSCAR_PREGUNTA('".concat(desc, "')"));
        case 6:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          res.status(200).json({
            preguntas: rows[0]
          });
          _context2.next = 15;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json(_context2.t0);
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 12]]);
  }));
  return function buscarPregunta(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para crear las preguntas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var crearPregunta = exports.crearPregunta = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, pregunta, respuesta, dbrespuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, pregunta = _req$body.pregunta, respuesta = _req$body.respuesta;
          _context3.prev = 1;
          _context3.next = 4;
          return _mysqlDb.pool.query("CALL LL_INSERTAR_PREGUNTA('".concat(pregunta, "','").concat(respuesta, "');"));
        case 4:
          dbrespuesta = _context3.sent;
          res.status(200).json(dbrespuesta);
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          res.status(500).json(_context3.t0);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return function crearPregunta(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para obtener las preguntas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var obtenerPregunta = exports.obtenerPregunta = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, respuesta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return _mysqlDb.pool.query("CALL LL_OBTENER_PREGUNTA('".concat(id, "');"));
        case 4:
          respuesta = _context4.sent;
          if (respuesta.length > 0) {
            res.status(200).json(respuesta[0][0][0]);
          } else {
            res.status(404).json({
              mensaje: "Pregunta no encontrada"
            });
          }
          _context4.next = 12;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          console.error('Error obteniendo pregunta:', _context4.t0);
          res.status(500).json({
            error: 'Error al obtener la pregunta'
          });
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 8]]);
  }));
  return function obtenerPregunta(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para editar las preguntas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var editarPregunta = exports.editarPregunta = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body2, pregunta, resp, id, respuesta;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body2 = req.body, pregunta = _req$body2.pregunta, resp = _req$body2.resp, id = _req$body2.id;
          _context5.prev = 1;
          _context5.next = 4;
          return _mysqlDb.pool.query("CALL LL_EDITAR_PREGUNTA('".concat(pregunta, "', '").concat(resp, "', '").concat(id, "');"));
        case 4:
          respuesta = _context5.sent;
          res.status(200).json({
            mensaje: 'Pregunta editada exitosamente'
          });
          _context5.next = 12;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          console.error(_context5.t0);
          res.status(500).json(_context5.t0);
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return function editarPregunta(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para desactivar las preguntas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var desactivarPregunta = exports.desactivarPregunta = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, _yield$pool$query5, _yield$pool$query6, respuesta;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.body.id;
          _context6.prev = 1;
          _context6.next = 4;
          return _mysqlDb.pool.query("CALL LL_DESACTIVAR_PREGUNTAS('".concat(id, "')"));
        case 4:
          _yield$pool$query5 = _context6.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          respuesta = _yield$pool$query6[0];
          res.json(respuesta);
          _context6.next = 13;
          break;
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](1);
          res.status(500).json(_context6.t0);
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 10]]);
  }));
  return function desactivarPregunta(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();