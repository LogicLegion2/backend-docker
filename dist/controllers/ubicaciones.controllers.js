"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.obtenerUbicacion = exports.listarUbicacion = exports.editarUbicacion = exports.desactivarUbicacion = exports.crearUbicacion = exports.buscarUbicacion = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysqlDb = require("../config/mysql.db.js");
var _dotenv = require("dotenv");
var _promise = _interopRequireDefault(require("mysql2/promise"));
/**
 * Este es el controlador de ubicaciones
 * @module ctr-ubicaciones
 */

(0, _dotenv.config)();

/**
 * Esta funcion sirve para mostrar todas las ubicaciones
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var listarUbicacion = exports.listarUbicacion = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _yield$pool$query, _yield$pool$query2, rows, ubicaciones;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _mysqlDb.pool.query("CALL LL_VER_UBICACIONES()");
        case 3:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          rows = _yield$pool$query2[0];
          ubicaciones = rows[0];
          ubicaciones.forEach(function (ubicacion) {
            if (ubicacion.fotoUbicacion) {
              try {
                ubicacion.img64 = Buffer.from(ubicacion.fotoUbicacion).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64:', bufferError);
                ubicacion.img64 = null;
              }
            } else {
              ubicacion.img64 = null;
            }
          });
          res.status(200).json({
            ubicaciones: ubicaciones
          });
          _context.next = 14;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          res.status(500).json(_context.t0);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function listarUbicacion(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para buscar las ubicaciones
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var buscarUbicacion = exports.buscarUbicacion = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var desc, _yield$pool$query3, _yield$pool$query4, rows, ubicaciones;
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
          return _mysqlDb.pool.query("CALL LL_BUSCAR_UBICACION('".concat(desc, "')"));
        case 6:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          ubicaciones = rows[0];
          ubicaciones.forEach(function (ubicacion) {
            if (ubicacion.foto) {
              try {
                ubicacion.img64 = Buffer.from(ubicacion.foto).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64:', bufferError);
                ubicacion.img64 = null;
              }
            } else {
              ubicacion.img64 = null;
            }
          });
          res.status(200).json({
            ubicaciones: ubicaciones
          });
          _context2.next = 17;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json(_context2.t0);
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 14]]);
  }));
  return function buscarUbicacion(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para crear las ubicaciones
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var crearUbicacion = exports.crearUbicacion = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var input, titulo, ubicacion, descripcion, foto, _respuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          input = req.body;
          titulo = input.titulo, ubicacion = input.ubicacion, descripcion = input.descripcion, foto = input.foto;
          _context3.prev = 2;
          _context3.next = 5;
          return _mysqlDb.pool.query("CALL LL_INSERTAR_UBICACION('".concat(titulo, "','").concat(ubicacion, "','").concat(descripcion, "','").concat(foto, "');"));
        case 5:
          _respuesta = _context3.sent;
          res.status(200).json(_respuesta);
          _context3.next = 12;
          break;
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](2);
          res.status(500).json(_context3.t0);
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 9]]);
  }));
  return function crearUbicacion(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para obtener las ubicaciones
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var obtenerUbicacion = exports.obtenerUbicacion = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, _respuesta2;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return _mysqlDb.pool.query("CALL LL_OBTENER_UBICACION('".concat(id, "');"));
        case 4:
          _respuesta2 = _context4.sent;
          if (_respuesta2.length > 0) {
            res.status(200).json(_respuesta2[0][0][0]);
          } else {
            res.status(404).json({
              mensaje: "Ubicación no encontrada"
            });
          }
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          res.status(500).json(_context4.t0);
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 8]]);
  }));
  return function obtenerUbicacion(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para editar las ubicaciones
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var editarUbicacion = exports.editarUbicacion = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var titulo, ubicacion, descripcion, id, _respuesta3;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          titulo = req.body.titulo;
          ubicacion = req.body.ubicacion;
          descripcion = req.body.descripcion;
          id = req.body.id;
          _context5.prev = 4;
          _context5.next = 7;
          return _mysqlDb.pool.query("CALL LL_EDITAR_UBICACION('".concat(titulo, "','").concat(ubicacion, "','").concat(descripcion, "','").concat(id, "');"));
        case 7:
          _respuesta3 = _context5.sent;
          res.status(200).json(_respuesta3);
          _context5.next = 14;
          break;
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](4);
          res.status(200).json(respuesta);
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[4, 11]]);
  }));
  return function editarUbicacion(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para desactivar las ubicaciones
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var desactivarUbicacion = exports.desactivarUbicacion = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, _respuesta4;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.body.id;
          _context6.prev = 1;
          _context6.next = 4;
          return _mysqlDb.pool.query("CALL LL_DESACTIVAR_UBICACION('".concat(id, "');"));
        case 4:
          _respuesta4 = _context6.sent;
          res.json(_respuesta4);
          _context6.next = 11;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](1);
          res.status(500).json(_context6.t0);
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 8]]);
  }));
  return function desactivarUbicacion(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();