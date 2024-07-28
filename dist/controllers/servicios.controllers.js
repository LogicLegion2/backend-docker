"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.obtenerServicio = exports.listarServicio = exports.editarServicio = exports.desactivarServicio = exports.crearServicio = exports.buscarServicio = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysqlDb = require("../config/mysql.db.js");
var _dotenv = require("dotenv");
var _promise = _interopRequireDefault(require("mysql2/promise"));
/**
 * Este es el controlador de servicios
 * @module ctr-servicios
 */

(0, _dotenv.config)();

/**
 * Esta funcion sirve para mostrar todos los servicios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var listarServicio = exports.listarServicio = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _yield$pool$query, _yield$pool$query2, rows, servicios;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _mysqlDb.pool.query("CALL LL_VER_SERVICIOS()");
        case 3:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          rows = _yield$pool$query2[0];
          servicios = rows[0];
          servicios.forEach(function (servicio) {
            if (servicio.fotoServicio) {
              try {
                servicio.img64 = Buffer.from(servicio.fotoServicio).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64:', bufferError);
                servicio.img64 = null;
              }
            } else {
              servicio.img64 = null;
            }
          });
          res.status(200).json({
            servicios: servicios
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
  return function listarServicio(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para buscar los servicios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var buscarServicio = exports.buscarServicio = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var desc, _yield$pool$query3, _yield$pool$query4, rows, servicios;
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
          return _mysqlDb.pool.query("CALL LL_BUSCAR_SERVICIO('".concat(desc, "')"));
        case 6:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          servicios = rows[0];
          servicios.forEach(function (servicio) {
            if (servicio.fotoServicio) {
              try {
                servicio.img64 = Buffer.from(servicio.fotoServicio).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64:', bufferError);
                servicio.img64 = null;
              }
            } else {
              servicio.img64 = null;
            }
          });
          res.status(200).json({
            servicios: servicios
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
  return function buscarServicio(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para crear los servicios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var crearServicio = exports.crearServicio = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var tipoServicio, descripcion, precio, foto, _yield$pool$query5, _yield$pool$query6, _respuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          tipoServicio = req.body.tipoServicio;
          descripcion = req.body.descripcion;
          precio = req.body.precio;
          foto = req.body.foto;
          _context3.prev = 4;
          _context3.next = 7;
          return _mysqlDb.pool.query("CALL LL_INSERTAR_SERVICIO('".concat(tipoServicio, "','").concat(descripcion, "','").concat(precio, "','").concat(foto, "');"));
        case 7:
          _yield$pool$query5 = _context3.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          _respuesta = _yield$pool$query6[0];
          res.status(200).json(_respuesta);
          _context3.next = 16;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](4);
          res.status(500).json(_context3.t0, "La reserva con estos valores ya fue tomada");
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[4, 13]]);
  }));
  return function crearServicio(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para obtener los servicios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var obtenerServicio = exports.obtenerServicio = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, _respuesta2;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return _mysqlDb.pool.query("CALL LL_OBTENER_SERVICIO('".concat(id, "');"));
        case 4:
          _respuesta2 = _context4.sent;
          if (_respuesta2.length > 0) {
            res.status(200).json(_respuesta2[0][0][0]);
          } else {
            res.status(404).json({
              mensaje: "servicio no encontrado"
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
  return function obtenerServicio(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para editar los servicios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var editarServicio = exports.editarServicio = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var tipoServicio, descripcion, precio, id, _respuesta3;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          tipoServicio = req.body.tipoServicio;
          descripcion = req.body.descripcion;
          precio = req.body.precio;
          id = req.body.id;
          _context5.prev = 4;
          _context5.next = 7;
          return _mysqlDb.pool.query("CALL LL_EDITAR_SERVICIO('".concat(tipoServicio, "','").concat(descripcion, "','").concat(precio, "','").concat(id, "');"));
        case 7:
          _respuesta3 = _context5.sent;
          res.status(200).json(_respuesta3);
          _context5.next = 14;
          break;
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](4);
          res.status(500).json(respuesta);
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[4, 11]]);
  }));
  return function editarServicio(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para desactivar los servicios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var desactivarServicio = exports.desactivarServicio = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, _respuesta4;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.body.id;
          _context6.prev = 1;
          _context6.next = 4;
          return _mysqlDb.pool.query("CALL LL_DESACTIVAR_SERVICIO('".concat(id, "');"));
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
  return function desactivarServicio(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();