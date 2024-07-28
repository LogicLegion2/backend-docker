"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listarReservasAdmin = exports.listarReservas = exports.historialReserva = exports.historialCita = exports.crearReserva = exports.cancelarReserva = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysqlDb = require("../config/mysql.db.js");
var _dotenv = require("dotenv");
var _dayjs = _interopRequireDefault(require("dayjs"));
require("dayjs/locale/es.js");
var _promise = _interopRequireDefault(require("mysql2/promise"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /**
 * Este es el controlador de reservas
 * @module ctr-reservas
 */ // Importa las configuraciones de idioma español
(0, _dotenv.config)();
_dayjs["default"].locale('es'); // Establece el idioma a español

/**
 * Esta funcion sirve para mostrar todas las reservas en la vista del admin
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var listarReservasAdmin = exports.listarReservasAdmin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _yield$pool$query, _yield$pool$query2, rows, reservas;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _mysqlDb.pool.query("CALL LL_VER_RESERVA_ADMIN()");
        case 3:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          rows = _yield$pool$query2[0];
          reservas = rows[0].map(function (reserva) {
            var fecha = new Date(reserva.fecha).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            });
            var hora = reserva.hora ? reserva.hora.substring(0, 5) : '';
            return _objectSpread(_objectSpread({}, reserva), {}, {
              fecha: fecha,
              hora: hora
            });
          });
          console.log(reservas);
          res.status(200).json({
            reservas: reservas
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
  return function listarReservasAdmin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para mostrar todas las reservas en la vista del cliente
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var listarReservas = exports.listarReservas = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, _yield$pool$query3, _yield$pool$query4, rows, reservas;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params['id'];
          _context2.prev = 1;
          _context2.next = 4;
          return _mysqlDb.pool.query("CALL LL_VER_RESERVAS(".concat(id, ")"));
        case 4:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          reservas = rows[0].map(function (reserva) {
            var fecha = new Date(reserva.fecha).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            });
            var hora = reserva.hora ? reserva.hora.substring(0, 5) : '';
            return _objectSpread(_objectSpread({}, reserva), {}, {
              fecha: fecha,
              hora: hora
            });
          });
          res.status(200).json({
            reservas: reservas
          });
          _context2.next = 14;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json(_context2.t0);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 11]]);
  }));
  return function listarReservas(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para crear las reservas 
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var crearReserva = exports.crearReserva = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, barbero, servicio, ubicacion, hora, comentario, fecha, _yield$pool$query5, _yield$pool$query6, respuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.body.id;
          barbero = req.body.barbero;
          servicio = req.body.servicio;
          ubicacion = req.body.ubicacion;
          hora = req.body.hora;
          comentario = req.body.comentario;
          fecha = req.body.fecha;
          _context3.prev = 7;
          _context3.next = 10;
          return _mysqlDb.pool.query("CALL LL_INSERTAR_RESERVA('".concat(id, "','").concat(barbero, "','").concat(servicio, "','").concat(ubicacion, "','").concat(hora, "','").concat(comentario, "','").concat(fecha, "')"));
        case 10:
          _yield$pool$query5 = _context3.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          respuesta = _yield$pool$query6[0];
          res.status(200).json(respuesta);
          _context3.next = 19;
          break;
        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](7);
          if (_context3.t0.sqlMessage === 'La reserva ya existe') {
            res.status(400).json({
              message: 'Esta reserva ya fue tomada, intenta con otros datos.'
            });
          } else {
            res.status(500).json({
              message: 'Error al crear la reserva.',
              error: _context3.t0
            });
          }
        case 19:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[7, 16]]);
  }));
  return function crearReserva(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para ver el historial de las citas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var historialCita = exports.historialCita = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, _yield$pool$query7, _yield$pool$query8, rows, reservas;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params['id'];
          _context4.prev = 1;
          _context4.next = 4;
          return _mysqlDb.pool.query("CALL LL_VER_HISTORIAL_CITAS(".concat(id, ")"));
        case 4:
          _yield$pool$query7 = _context4.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          rows = _yield$pool$query8[0];
          // Dar formato sencillo de fecha
          reservas = rows[0].map(function (reserva) {
            var fecha = new Date(reserva.fecha).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            });
            var hora = reserva.hora ? reserva.hora.substring(0, 5) : '';
            return _objectSpread(_objectSpread({}, reserva), {}, {
              fecha: fecha,
              hora: hora
            });
          });
          res.status(200).json({
            reservas: reservas
          });
          _context4.next = 14;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](1);
          res.status(500).json(_context4.t0);
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 11]]);
  }));
  return function historialCita(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para cancelar las reservas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var cancelarReserva = exports.cancelarReserva = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, respuesta;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.body.id;
          _context5.prev = 1;
          _context5.next = 4;
          return _mysqlDb.pool.query("CALL LL_CANCELAR_CITA('".concat(id, "');"));
        case 4:
          respuesta = _context5.sent;
          res.status(200).json(respuesta);
          _context5.next = 11;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          res.status(500).json(_context5.t0);
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return function cancelarReserva(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para ver el historial de reservas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var historialReserva = exports.historialReserva = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _yield$pool$query9, _yield$pool$query10, rows, reservas;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _mysqlDb.pool.query("CALL LL_VER_HISTORIAL_RESERVAS()");
        case 3:
          _yield$pool$query9 = _context6.sent;
          _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
          rows = _yield$pool$query10[0];
          reservas = rows[0].map(function (reserva) {
            var fecha = new Date(reserva.fecha).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            });
            var hora = reserva.hora ? reserva.hora.substring(0, 5) : '';
            return _objectSpread(_objectSpread({}, reserva), {}, {
              fecha: fecha,
              hora: hora
            });
          });
          res.status(200).json({
            reservas: reservas
          });
          _context6.next = 13;
          break;
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json(_context6.t0);
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 10]]);
  }));
  return function historialReserva(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();