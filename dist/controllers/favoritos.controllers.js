"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listarFavoritos = exports.crearServicioFavorito = exports.crearProductoFavorito = exports.crearOfertaFavorito = exports.crearBarberoFavorito = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysqlDb = require("../config/mysql.db.js");
var _dotenv = require("dotenv");
var _promise = _interopRequireDefault(require("mysql2/promise"));
/**
 * Este es el controlador de favoritos
 * @module ctr-favoritos
 */

(0, _dotenv.config)();

/**
 * Esta funcion sirve para mostrar todos los favoritos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var listarFavoritos = exports.listarFavoritos = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, _yield$Promise$all, _yield$Promise$all2, _yield$Promise$all2$, rowsBar, _yield$Promise$all2$2, rowsPro, _yield$Promise$all2$3, rowsOfe, _yield$Promise$all2$4, rowsSer, barberos, servicios, productos, ofertas, favoritos;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          id = req.params['id'];
          _context.prev = 1;
          _context.next = 4;
          return Promise.all([_mysqlDb.pool.query("CALL LL_VER_BARBERO_FAVORITO('".concat(id, "');")), _mysqlDb.pool.query("CALL LL_VER_PRODUCTO_FAVORITO('".concat(id, "');")), _mysqlDb.pool.query("CALL LL_VER_OFERTA_FAVORITO('".concat(id, "');")), _mysqlDb.pool.query("CALL LL_VER_SERVICIO_FAVORITO('".concat(id, "');"))]);
        case 4:
          _yield$Promise$all = _context.sent;
          _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 4);
          _yield$Promise$all2$ = (0, _slicedToArray2["default"])(_yield$Promise$all2[0], 1);
          rowsBar = _yield$Promise$all2$[0];
          _yield$Promise$all2$2 = (0, _slicedToArray2["default"])(_yield$Promise$all2[1], 1);
          rowsPro = _yield$Promise$all2$2[0];
          _yield$Promise$all2$3 = (0, _slicedToArray2["default"])(_yield$Promise$all2[2], 1);
          rowsOfe = _yield$Promise$all2$3[0];
          _yield$Promise$all2$4 = (0, _slicedToArray2["default"])(_yield$Promise$all2[3], 1);
          rowsSer = _yield$Promise$all2$4[0];
          barberos = rowsBar[0] || [];
          servicios = rowsSer[0] || [];
          productos = rowsPro[0] || [];
          ofertas = rowsOfe[0] || [];
          console.log(barberos);
          barberos.forEach(function (barbero) {
            barbero.img64 = null;
            if (barbero.foto) {
              try {
                barbero.img64 = Buffer.from(barbero.foto).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64:', bufferError);
              }
            }
          });
          servicios.forEach(function (servicio) {
            servicio.img64 = null;
            if (servicio.foto) {
              try {
                servicio.img64 = Buffer.from(servicio.foto).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64:', bufferError);
              }
            }
          });
          productos.forEach(function (producto) {
            producto.img64 = null;
            if (producto.foto) {
              try {
                producto.img64 = Buffer.from(producto.foto).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64:', bufferError);
              }
            }
          });
          ofertas.forEach(function (oferta) {
            oferta.img64 = null;
            if (oferta.foto) {
              try {
                oferta.img64 = Buffer.from(oferta.foto).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64:', bufferError);
              }
            }
          });
          favoritos = {
            barbero: barberos,
            producto: productos,
            oferta: ofertas,
            servicio: servicios
          };
          res.status(200).json({
            favoritos: favoritos
          });
          _context.next = 31;
          break;
        case 27:
          _context.prev = 27;
          _context.t0 = _context["catch"](1);
          console.error('Error en listarFavoritos:', _context.t0);
          res.status(500).json({
            error: 'Error al listar favoritos'
          });
        case 31:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 27]]);
  }));
  return function listarFavoritos(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para crear barbero favorito
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var crearBarberoFavorito = exports.crearBarberoFavorito = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, barbero, respuesta;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.body.id;
          barbero = req.params['barbero'];
          _context2.prev = 2;
          _context2.next = 5;
          return _mysqlDb.pool.query("CALL LL_INSERTAR_BARBERO_FAVORITO('".concat(barbero, "','").concat(id, "');"));
        case 5:
          respuesta = _context2.sent;
          res.status(200).json(respuesta);
          _context2.next = 12;
          break;
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](2);
          res.status(500).json(_context2.t0);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2, 9]]);
  }));
  return function crearBarberoFavorito(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para crear producto favorito
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var crearProductoFavorito = exports.crearProductoFavorito = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, producto, respuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.body.id;
          producto = req.params['producto'];
          _context3.prev = 2;
          _context3.next = 5;
          return _mysqlDb.pool.query("CALL LL_INSERTAR_PRODUCTO_FAVORITO('".concat(producto, "','").concat(id, "');"));
        case 5:
          respuesta = _context3.sent;
          res.status(200).json(respuesta);
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
  return function crearProductoFavorito(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para crear oferta favorito
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var crearOfertaFavorito = exports.crearOfertaFavorito = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, oferta, respuesta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.body.id;
          oferta = req.params['oferta'];
          _context4.prev = 2;
          _context4.next = 5;
          return _mysqlDb.pool.query("CALL LL_INSERTAR_OFERTA_FAVORITO('".concat(oferta, "','").concat(id, "');"));
        case 5:
          respuesta = _context4.sent;
          res.status(200).json(respuesta);
          _context4.next = 12;
          break;
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](2);
          res.status(500).json(_context4.t0);
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 9]]);
  }));
  return function crearOfertaFavorito(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para crear servicio favorito
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var crearServicioFavorito = exports.crearServicioFavorito = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, servicio, respuesta;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.body.id;
          servicio = req.params['servicio'];
          _context5.prev = 2;
          _context5.next = 5;
          return _mysqlDb.pool.query("CALL LL_INSERTAR_SERVICIO_FAVORITO('".concat(servicio, "','").concat(id, "');"));
        case 5:
          respuesta = _context5.sent;
          res.status(200).json(respuesta);
          _context5.next = 12;
          break;
        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](2);
          res.status(500).json(_context5.t0);
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[2, 9]]);
  }));
  return function crearServicioFavorito(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();