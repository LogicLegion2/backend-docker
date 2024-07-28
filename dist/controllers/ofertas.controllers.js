"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.obtenerOferta = exports.listarOferta = exports.editarOferta = exports.desactivarOferta = exports.crearOferta = exports.buscarOferta = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysqlDb = require("../config/mysql.db.js");
var _dotenv = require("dotenv");
var _promise = _interopRequireDefault(require("mysql2/promise"));
/**
 * Este es el controlador de ofertas
 * @module ctr-ofertas
 */

(0, _dotenv.config)();

/**
 * Esta funcion sirve para mostrar todos las ofertas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var listarOferta = exports.listarOferta = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _yield$pool$query, _yield$pool$query2, rows, productos;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _mysqlDb.pool.query("CALL LL_VER_OFERTAS()");
        case 3:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          rows = _yield$pool$query2[0];
          productos = rows[0];
          productos.forEach(function (producto) {
            if (producto.foto) {
              try {
                producto.img64 = Buffer.from(producto.foto).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64:', bufferError);
                producto.img64 = null;
              }
            } else {
              producto.img64 = null;
            }
          });
          res.status(200).json({
            ofertas: productos
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
  return function listarOferta(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para buscar las ofertas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var buscarOferta = exports.buscarOferta = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var desc, _yield$pool$query3, _yield$pool$query4, rows, ofertas;
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
          return _mysqlDb.pool.query("CALL LL_BUSCAR_OFERTA('".concat(desc, "')"));
        case 6:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          ofertas = rows[0];
          ofertas.forEach(function (oferta) {
            if (oferta.foto) {
              try {
                oferta.img64 = Buffer.from(oferta.foto).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64:', bufferError);
                oferta.img64 = null;
              }
            } else {
              oferta.img64 = null;
            }
          });
          res.status(200).json({
            ofertas: ofertas
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
  return function buscarOferta(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para crear las ofertas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var crearOferta = exports.crearOferta = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var producto1, producto2, descripcion, precio, foto, _yield$pool$query5, _yield$pool$query6, respuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          producto1 = req.body.producto1;
          producto2 = req.body.producto2;
          descripcion = req.body.descripcion;
          precio = req.body.precio;
          foto = req.body.foto;
          _context3.prev = 5;
          _context3.next = 8;
          return _mysqlDb.pool.query("CALL LL_INSERTAR_OFERTA('".concat(producto1, "','").concat(producto2, "','").concat(descripcion, "','").concat(precio, "','").concat(foto, "');"));
        case 8:
          _yield$pool$query5 = _context3.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          respuesta = _yield$pool$query6[0];
          res.status(200).json(respuesta);
          _context3.next = 17;
          break;
        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](5);
          res.status(500).json(_context3.t0);
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[5, 14]]);
  }));
  return function crearOferta(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para obtener las ofertas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var obtenerOferta = exports.obtenerOferta = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, respuestaOferta, oferta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return _mysqlDb.pool.query("CALL LL_OBTENER_OFERTA('".concat(id, "');"));
        case 4:
          respuestaOferta = _context4.sent;
          oferta = respuestaOferta[0][0][0];
          if (oferta) {
            res.status(200).json(oferta);
          } else {
            res.status(404).json({
              mensaje: "Oferta no encontrada"
            });
          }
          _context4.next = 12;
          break;
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](1);
          res.status(500).json({
            error: 'Error al obtener la oferta'
          });
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 9]]);
  }));
  return function obtenerOferta(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para editar las ofertas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var editarOferta = exports.editarOferta = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body, producto1, producto2, descripcion, precio, id, respuesta;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body = req.body, producto1 = _req$body.producto1, producto2 = _req$body.producto2, descripcion = _req$body.descripcion, precio = _req$body.precio, id = _req$body.id;
          _context5.prev = 1;
          _context5.next = 4;
          return _mysqlDb.pool.query("CALL LL_EDITAR_OFERTA('".concat(producto1, "','").concat(producto2, "','").concat(descripcion, "','").concat(precio, "','").concat(id, "');"));
        case 4:
          respuesta = _context5.sent;
          res.status(200).json({
            respuesta: respuesta
          });
          _context5.next = 11;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          res.status(500).json({
            error: _context5.t0
          });
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return function editarOferta(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para desactivar las ofertas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var desactivarOferta = exports.desactivarOferta = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, respuesta;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.body.id;
          _context6.prev = 1;
          _context6.next = 4;
          return _mysqlDb.pool.query("CALL LL_DESACTIVAR_OFERTA('".concat(id, "');"));
        case 4:
          respuesta = _context6.sent;
          res.json(respuesta);
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
  return function desactivarOferta(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();