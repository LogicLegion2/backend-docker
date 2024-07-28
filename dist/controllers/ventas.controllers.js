"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verificarStock = exports.verReservasProductos = exports.verEntregasAdmin = exports.verEntregas = exports.verCarroCompras = exports.reiniciarCarritoCompras = exports.historialCompra = exports.desactivarProductoCarrito = exports.desactivarEntrega = exports.crearReembolso = exports.crearPago = exports.cancelarUltimaVenta = exports.buscarProductoVendido = exports.agregarProductoCarrito = void 0;
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
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } /**
 * Este es el controlador de ventas
 * @module ctr-ventas
 */
(0, _dotenv.config)();
_dayjs["default"].locale('es'); // Establece el idioma a español

/**
 * Esta funcion sirve para crear un pago
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var verificarStock = exports.verificarStock = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var productos, _iterator, _step, producto, _yield$pool$query, _yield$pool$query2, stockResponse, stockDisponible;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          productos = req.body.productos;
          _context.prev = 1;
          _iterator = _createForOfIteratorHelper(productos);
          _context.prev = 3;
          _iterator.s();
        case 5:
          if ((_step = _iterator.n()).done) {
            _context.next = 17;
            break;
          }
          producto = _step.value;
          _context.next = 9;
          return _mysqlDb.pool.query("CALL LL_VERIFICAR_STOCK('".concat(producto.idProducto, "')"));
        case 9:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          stockResponse = _yield$pool$query2[0];
          stockDisponible = stockResponse[0][0].cantidad;
          if (!(stockDisponible < producto.cantidad)) {
            _context.next = 15;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "No hay suficiente stock para el producto: ".concat(producto.producto)
          }));
        case 15:
          _context.next = 5;
          break;
        case 17:
          _context.next = 22;
          break;
        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](3);
          _iterator.e(_context.t0);
        case 22:
          _context.prev = 22;
          _iterator.f();
          return _context.finish(22);
        case 25:
          res.status(200).json({
            message: 'Operación realizada con éxito'
          });
          _context.next = 31;
          break;
        case 28:
          _context.prev = 28;
          _context.t1 = _context["catch"](1);
          res.status(500).json({
            error: 'Error al comparar stock'
          });
        case 31:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 28], [3, 19, 22, 25]]);
  }));
  return function verificarStock(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para crear un pago
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var crearPago = exports.crearPago = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, id, productos, totalGlobal, metodoEntrega, direccion, _yield$pool$query3, _yield$pool$query4, ventaResponse, _yield$pool$query5, _yield$pool$query6, idResponse, idVenta, _iterator2, _step2, producto;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, id = _req$body.id, productos = _req$body.productos, totalGlobal = _req$body.totalGlobal, metodoEntrega = _req$body.metodoEntrega, direccion = _req$body.direccion;
          _context2.prev = 1;
          _context2.next = 4;
          return _mysqlDb.pool.query("CALL LL_INSERTAR_VENTA('".concat(id, "', '").concat(totalGlobal, "', '").concat(metodoEntrega, "', '").concat(direccion, "');"));
        case 4:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          ventaResponse = _yield$pool$query4[0];
          _context2.next = 9;
          return _mysqlDb.pool.query("CALL LL_ULTIMO_ID_VENTA();");
        case 9:
          _yield$pool$query5 = _context2.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          idResponse = _yield$pool$query6[0];
          idVenta = idResponse[0][0].idVenta;
          _iterator2 = _createForOfIteratorHelper(productos);
          _context2.prev = 14;
          _iterator2.s();
        case 16:
          if ((_step2 = _iterator2.n()).done) {
            _context2.next = 22;
            break;
          }
          producto = _step2.value;
          _context2.next = 20;
          return _mysqlDb.pool.query("CALL LL_INSERTAR_PRODUCTO_VENTA('".concat(producto.idProducto, "', '").concat(idVenta, "', '").concat(producto.cantidad, "');"));
        case 20:
          _context2.next = 16;
          break;
        case 22:
          _context2.next = 27;
          break;
        case 24:
          _context2.prev = 24;
          _context2.t0 = _context2["catch"](14);
          _iterator2.e(_context2.t0);
        case 27:
          _context2.prev = 27;
          _iterator2.f();
          return _context2.finish(27);
        case 30:
          res.status(200).json({
            message: 'Compra realizada con éxito'
          });
          _context2.next = 36;
          break;
        case 33:
          _context2.prev = 33;
          _context2.t1 = _context2["catch"](1);
          res.status(500).json({
            error: 'Error al registrar la compra'
          });
        case 36:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 33], [14, 24, 27, 30]]);
  }));
  return function crearPago(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para cancelar la última venta realizada
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var cancelarUltimaVenta = exports.cancelarUltimaVenta = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, _yield$pool$query7, _yield$pool$query8, response;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.body.id;
          _context3.prev = 1;
          _context3.next = 4;
          return _mysqlDb.pool.query("CALL LL_CANCELAR_ULTIMA_VENTA('".concat(id, "');"));
        case 4:
          _yield$pool$query7 = _context3.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          response = _yield$pool$query8[0];
          res.status(200).json({
            response: response
          });
          _context3.next = 13;
          break;
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          res.status(500).json({
            error: 'Error al registrar la compra'
          });
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 10]]);
  }));
  return function cancelarUltimaVenta(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para crear un reembolso
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var crearReembolso = exports.crearReembolso = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var idUsuario, idVenta, _yield$pool$query9, _yield$pool$query10, respuesta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          idUsuario = req.body.idUsuario;
          idVenta = req.body.idVenta;
          _context4.prev = 2;
          _context4.next = 5;
          return _mysqlDb.pool.query("CALL LL_INSERTAR_REEMBOLSO('".concat(idUsuario, "','").concat(idVenta, "');"));
        case 5:
          _yield$pool$query9 = _context4.sent;
          _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
          respuesta = _yield$pool$query10[0];
          res.status(200).json(respuesta);
          _context4.next = 14;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](2);
          res.status(500).json(_context4.t0);
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 11]]);
  }));
  return function crearReembolso(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para buscar un producto vendido
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var buscarProductoVendido = exports.buscarProductoVendido = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var desc, _yield$pool$query11, _yield$pool$query12, rows, productos;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          desc = req.query.desc;
          _context5.prev = 1;
          if (desc) {
            _context5.next = 4;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: "Se requiere patrón de búsqueda"
          }));
        case 4:
          _context5.next = 6;
          return _mysqlDb.pool.query("CALL LL_BUSCAR_VENDIDO('".concat(desc, "')"));
        case 6:
          _yield$pool$query11 = _context5.sent;
          _yield$pool$query12 = (0, _slicedToArray2["default"])(_yield$pool$query11, 1);
          rows = _yield$pool$query12[0];
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
          _context5.next = 17;
          break;
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](1);
          res.status(500).json(_context5.t0);
        case 17:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 14]]);
  }));
  return function buscarProductoVendido(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para ver el historial de compras
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var historialCompra = exports.historialCompra = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, _yield$pool$query13, _yield$pool$query14, rows, compras;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params['id'];
          _context6.prev = 1;
          _context6.next = 4;
          return _mysqlDb.pool.query("CALL LL_VER_HISTORIAL_COMPRAS('".concat(id, "')"));
        case 4:
          _yield$pool$query13 = _context6.sent;
          _yield$pool$query14 = (0, _slicedToArray2["default"])(_yield$pool$query13, 1);
          rows = _yield$pool$query14[0];
          compras = rows[0].map(function (compra) {
            var fecha = new Date(compra.fecha).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            });
            return _objectSpread(_objectSpread({}, compra), {}, {
              fecha: fecha
            });
          });
          compras.forEach(function (compra) {
            if (compra.foto) {
              try {
                compra.img64 = Buffer.from(compra.foto).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64:', bufferError);
                compra.img64 = null;
              }
            } else {
              compra.img64 = null; // O algún valor predeterminado si la imagen no existe
            }
          });
          res.status(200).json({
            compras: compras
          });
          _context6.next = 15;
          break;
        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](1);
          res.status(500).json(_context6.t0);
        case 15:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 12]]);
  }));
  return function historialCompra(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para ver el carrito de compras
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var verCarroCompras = exports.verCarroCompras = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, respuesta, productos;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params['id'];
          _context7.prev = 1;
          _context7.next = 4;
          return _mysqlDb.pool.query("CALL LL_VER_CARRITO_COMPRAS('".concat(id, "');"));
        case 4:
          respuesta = _context7.sent;
          productos = respuesta[0][0];
          productos.forEach(function (producto) {
            if (producto.fotoProducto) {
              try {
                producto.img64 = Buffer.from(producto.fotoProducto).toString('base64');
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
          _context7.next = 13;
          break;
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](1);
          res.status(500).json(_context7.t0);
        case 13:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 10]]);
  }));
  return function verCarroCompras(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para limpiar la lista de productos en el carrito de compras
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var reiniciarCarritoCompras = exports.reiniciarCarritoCompras = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var id, _yield$pool$query15, _yield$pool$query16, response;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          id = req.body.id;
          console.log(id);
          _context8.prev = 2;
          _context8.next = 5;
          return _mysqlDb.pool.query("CALL LL_REINICIAR_CARRITO('".concat(id, "');"));
        case 5:
          _yield$pool$query15 = _context8.sent;
          _yield$pool$query16 = (0, _slicedToArray2["default"])(_yield$pool$query15, 1);
          response = _yield$pool$query16[0];
          res.status(200).json({
            response: response
          });
          _context8.next = 14;
          break;
        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](2);
          res.status(500).json({
            error: 'Error al registrar la compra'
          });
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[2, 11]]);
  }));
  return function reiniciarCarritoCompras(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para que el admin ver las entregas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var verEntregasAdmin = exports.verEntregasAdmin = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var rows, entregas;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _mysqlDb.pool.query("CALL LL_VER_ENTREGAS_ADMIN()");
        case 3:
          rows = _context9.sent;
          entregas = rows[0][0].map(function (entrega) {
            var fecha = new Date(entrega.fecha).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            });
            return _objectSpread(_objectSpread({}, entrega), {}, {
              fecha: fecha
            });
          });
          res.status(200).json({
            entregas: entregas
          });
          _context9.next = 11;
          break;
        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          res.status(500).json(_context9.t0);
        case 11:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 8]]);
  }));
  return function verEntregasAdmin(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para ver las entregas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var verEntregas = exports.verEntregas = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var id, _yield$pool$query17, _yield$pool$query18, rows, entregas;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          id = req.params['id'];
          _context10.prev = 1;
          _context10.next = 4;
          return _mysqlDb.pool.query("CALL LL_VER_ENTREGAS('".concat(id, "')"));
        case 4:
          _yield$pool$query17 = _context10.sent;
          _yield$pool$query18 = (0, _slicedToArray2["default"])(_yield$pool$query17, 1);
          rows = _yield$pool$query18[0];
          entregas = rows[0].map(function (entrega) {
            var fecha = new Date(entrega.fecha).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            });
            return _objectSpread(_objectSpread({}, entrega), {}, {
              fecha: fecha
            });
          });
          res.status(200).json({
            entregas: entregas
          });
          _context10.next = 14;
          break;
        case 11:
          _context10.prev = 11;
          _context10.t0 = _context10["catch"](1);
          res.status(500).json(_context10.t0);
        case 14:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[1, 11]]);
  }));
  return function verEntregas(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para ver las reservas de los productos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var verReservasProductos = exports.verReservasProductos = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var _yield$pool$query19, _yield$pool$query20, rows, productos;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return _mysqlDb.pool.query("CALL LL_VER_RESERVAS_PRODUCTOS()");
        case 3:
          _yield$pool$query19 = _context11.sent;
          _yield$pool$query20 = (0, _slicedToArray2["default"])(_yield$pool$query19, 1);
          rows = _yield$pool$query20[0];
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
          _context11.next = 14;
          break;
        case 11:
          _context11.prev = 11;
          _context11.t0 = _context11["catch"](0);
          res.status(500).json(_context11.t0);
        case 14:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 11]]);
  }));
  return function verReservasProductos(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para desactivar las entregas de los clientes
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var desactivarEntrega = exports.desactivarEntrega = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var id, respuesta;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          id = req.body.id;
          _context12.prev = 1;
          _context12.next = 4;
          return _mysqlDb.pool.query("CALL LL_DESACTIVAR_ENTREGA('".concat(id, "');"));
        case 4:
          respuesta = _context12.sent;
          res.json(respuesta);
          _context12.next = 11;
          break;
        case 8:
          _context12.prev = 8;
          _context12.t0 = _context12["catch"](1);
          res.status(500).json(_context12.t0);
        case 11:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[1, 8]]);
  }));
  return function desactivarEntrega(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para desactivar las entregas de los clientes
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var desactivarProductoCarrito = exports.desactivarProductoCarrito = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var idProducto, id, respuesta;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          idProducto = req.body.idProducto;
          id = req.body.id;
          console.log(idProducto, id);
          _context13.prev = 3;
          _context13.next = 6;
          return _mysqlDb.pool.query("CALL LL_DESACTIVAR_PRODUCTO_CARRITO('".concat(idProducto, "','").concat(id, "');"));
        case 6:
          respuesta = _context13.sent;
          res.json(respuesta);
          _context13.next = 13;
          break;
        case 10:
          _context13.prev = 10;
          _context13.t0 = _context13["catch"](3);
          res.status(500).json(_context13.t0);
        case 13:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[3, 10]]);
  }));
  return function desactivarProductoCarrito(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para agregar un producto al carrito de compras
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var agregarProductoCarrito = exports.agregarProductoCarrito = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var id, producto, respuesta;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          id = req.body.id;
          producto = req.params['producto'];
          _context14.prev = 2;
          _context14.next = 5;
          return _mysqlDb.pool.query("CALL LL_INSERTAR_PRODUCTO_CARRITO('".concat(id, "','").concat(producto, "');"));
        case 5:
          respuesta = _context14.sent;
          res.status(200).json(respuesta);
          _context14.next = 12;
          break;
        case 9:
          _context14.prev = 9;
          _context14.t0 = _context14["catch"](2);
          res.status(500).json(_context14.t0);
        case 12:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[2, 9]]);
  }));
  return function agregarProductoCarrito(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();