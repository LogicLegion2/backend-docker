"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.obtenerProducto = exports.listarProductosVendidos = exports.listarProducto = exports.editarProducto = exports.desactivarProducto = exports.crearProducto = exports.buscarProducto = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysqlDb = require("../config/mysql.db.js");
var _promise = _interopRequireDefault(require("mysql2/promise.js"));
var _dotenv = require("dotenv");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
/**
 * Este es el controlador de productos
 * @module ctr-productos
 */

(0, _dotenv.config)();

/**
 * Esta funcion sirve para mostrar todos los productos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var listarProducto = exports.listarProducto = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _yield$pool$query, _yield$pool$query2, rows, productos;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _mysqlDb.pool.query("CALL LL_VER_PRODUCTOS()");
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
            productos: productos
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
  return function listarProducto(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para mostrar todos los productos vendidos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var listarProductosVendidos = exports.listarProductosVendidos = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _yield$pool$query3, _yield$pool$query4, rows, productos;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _mysqlDb.pool.query("CALL LL_VER_PRODUCTOS_VENDIDOS()");
        case 3:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
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
            productos: productos
          });
          _context2.next = 14;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json(_context2.t0);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return function listarProductosVendidos(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para buscar los productos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var buscarProducto = exports.buscarProducto = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var desc, _yield$pool$query5, _yield$pool$query6, rows, productos;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          desc = req.query.desc;
          _context3.prev = 1;
          if (desc) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Se requiere patrón de búsqueda"
          }));
        case 4:
          _context3.next = 6;
          return _mysqlDb.pool.query("CALL LL_BUSCAR_PRODUCTO('".concat(desc, "')"));
        case 6:
          _yield$pool$query5 = _context3.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          rows = _yield$pool$query6[0];
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
          ;
          res.status(200).json({
            productos: productos
          });
          _context3.next = 18;
          break;
        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](1);
          res.status(500).json(_context3.t0);
        case 18:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 15]]);
  }));
  return function buscarProducto(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para crear los productos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var crearProducto = exports.crearProducto = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var nombre, descripcion, precio, cantidad, fotoProducto, _yield$pool$query7, _yield$pool$query8, _respuesta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          nombre = req.body.nombre;
          descripcion = req.body.descripcion;
          precio = req.body.precio;
          cantidad = req.body.cantidad;
          fotoProducto = req.body.fotoProducto;
          _context4.prev = 5;
          _context4.next = 8;
          return _mysqlDb.pool.query("CALL LL_INSERTAR_PRODUCTO('".concat(nombre, "','").concat(descripcion, "','").concat(precio, "','").concat(cantidad, "','").concat(fotoProducto, "');"));
        case 8:
          _yield$pool$query7 = _context4.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          _respuesta = _yield$pool$query8[0];
          res.json(_respuesta);
          _context4.next = 17;
          break;
        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](5);
          res.status(500).json(_context4.t0);
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[5, 14]]);
  }));
  return function crearProducto(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para obtener los productos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var obtenerProducto = exports.obtenerProducto = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, _respuesta2;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return _mysqlDb.pool.query("CALL LL_OBTENER_PRODUCTO('".concat(id, "');"));
        case 4:
          _respuesta2 = _context5.sent;
          if (_respuesta2.length > 0) {
            res.status(200).json(_respuesta2[0][0][0]);
          } else {
            res.status(404).json({
              mensaje: "Producto no encontrado"
            });
          }
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
  return function obtenerProducto(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para editar los productos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var editarProducto = exports.editarProducto = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var nombre, descripcion, precio, id, _respuesta3;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          nombre = req.body.nombre;
          descripcion = req.body.descripcion;
          precio = req.body.precio;
          id = req.body.id;
          _context6.prev = 4;
          _context6.next = 7;
          return _mysqlDb.pool.query("CALL LL_EDITAR_PRODUCTO('".concat(nombre, "','").concat(descripcion, "','").concat(precio, "','").concat(id, "');"));
        case 7:
          _respuesta3 = _context6.sent;
          res.status(200).json(_respuesta3);
          _context6.next = 14;
          break;
        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](4);
          res.status(500).json(respuesta);
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[4, 11]]);
  }));
  return function editarProducto(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para desactivar los productos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var desactivarProducto = exports.desactivarProducto = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, _respuesta4;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          id = req.body.id;
          _context7.prev = 1;
          _context7.next = 4;
          return _mysqlDb.pool.query("CALL LL_DESACTIVAR_PRODUCTO('".concat(id, "');"));
        case 4:
          _respuesta4 = _context7.sent;
          res.json(_respuesta4);
          _context7.next = 11;
          break;
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](1);
          res.status(500).json(_context7.t0);
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 8]]);
  }));
  return function desactivarProducto(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();