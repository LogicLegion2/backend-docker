"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verPerfilBarberoAdmin = exports.verPerfilBarbero = exports.verCalendario = exports.perfilBarbero = exports.listarBarberoAdmin = exports.listarBarbero = exports.buscar = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysqlDb = require("../config/mysql.db.js");
var _dotenv = require("dotenv");
var _promise = _interopRequireDefault(require("mysql2/promise"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /**
 * Este es el controlador de barbero
 * @module ctr-barbero
 */
(0, _dotenv.config)();

/**
 * Esta funcion sirve para mostrar todos los barberos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var listarBarbero = exports.listarBarbero = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _yield$Promise$all, _yield$Promise$all2, _yield$Promise$all2$, rowsBar, _yield$Promise$all2$2, rowsSer, _yield$Promise$all2$3, rowsPro, _yield$Promise$all2$4, rowsOfe, _yield$Promise$all2$5, rowsUbi, _yield$Promise$all2$6, rowsPre, barberos, servicios, productos, ofertas, ubicaciones, preguntas;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Promise.all([_mysqlDb.pool.query("CALL LL_VER_BARBERO()"), _mysqlDb.pool.query("CALL LL_VER_SERVICIOS()"), _mysqlDb.pool.query("CALL LL_VER_PRODUCTOS()"), _mysqlDb.pool.query("CALL LL_VER_OFERTAS()"), _mysqlDb.pool.query("CALL LL_VER_UBICACIONES()"), _mysqlDb.pool.query("CALL LL_VER_PREGUNTAS()")]);
        case 3:
          _yield$Promise$all = _context.sent;
          _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 6);
          _yield$Promise$all2$ = (0, _slicedToArray2["default"])(_yield$Promise$all2[0], 1);
          rowsBar = _yield$Promise$all2$[0];
          _yield$Promise$all2$2 = (0, _slicedToArray2["default"])(_yield$Promise$all2[1], 1);
          rowsSer = _yield$Promise$all2$2[0];
          _yield$Promise$all2$3 = (0, _slicedToArray2["default"])(_yield$Promise$all2[2], 1);
          rowsPro = _yield$Promise$all2$3[0];
          _yield$Promise$all2$4 = (0, _slicedToArray2["default"])(_yield$Promise$all2[3], 1);
          rowsOfe = _yield$Promise$all2$4[0];
          _yield$Promise$all2$5 = (0, _slicedToArray2["default"])(_yield$Promise$all2[4], 1);
          rowsUbi = _yield$Promise$all2$5[0];
          _yield$Promise$all2$6 = (0, _slicedToArray2["default"])(_yield$Promise$all2[5], 1);
          rowsPre = _yield$Promise$all2$6[0];
          barberos = rowsBar[0];
          servicios = rowsSer[0];
          productos = rowsPro[0];
          ofertas = rowsOfe[0];
          ubicaciones = rowsUbi[0];
          preguntas = rowsPre[0];
          barberos.forEach(function (barbero) {
            if (barbero.foto) {
              try {
                barbero.img64 = Buffer.from(barbero.foto).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64:', bufferError);
                barbero.img64 = null;
              }
            } else {
              barbero.img64 = null;
            }
          });
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
            barberos: barberos,
            servicios: servicios,
            productos: productos,
            ofertas: ofertas,
            ubicaciones: ubicaciones,
            preguntas: preguntas
          });
          _context.next = 34;
          break;
        case 31:
          _context.prev = 31;
          _context.t0 = _context["catch"](0);
          res.status(500).json(_context.t0);
        case 34:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 31]]);
  }));
  return function listarBarbero(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para mostrar los barberos al admin
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var listarBarberoAdmin = exports.listarBarberoAdmin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _yield$pool$query, _yield$pool$query2, rows, barberos;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _mysqlDb.pool.query("CALL LL_VER_BARBERO()");
        case 3:
          _yield$pool$query = _context2.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          rows = _yield$pool$query2[0];
          barberos = rows[0];
          barberos.forEach(function (barbero) {
            if (barbero.foto) {
              try {
                barbero.img64 = Buffer.from(barbero.foto).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64:', bufferError);
                barbero.img64 = null;
              }
            } else {
              barbero.img64 = null;
            }
          });
          res.status(200).json({
            barberos: barberos
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
  return function listarBarberoAdmin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para buscar barberos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var buscar = exports.buscar = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$query, desc, tipo, resultados, _yield$Promise$all3, _yield$Promise$all4, _yield$Promise$all4$, rowsBar, _yield$Promise$all4$2, rowsSer, _yield$Promise$all4$3, rowsPro, _yield$Promise$all4$4, rowsOfe, _yield$Promise$all4$5, rowsUbi, _yield$Promise$all4$6, rowsPre, barberos, servicios, productos, ofertas, ubicaciones, preguntas, query, _yield$pool$query3, _yield$pool$query4, resulBusqueda;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$query = req.query, desc = _req$query.desc, tipo = _req$query.tipo;
          if (!(!desc || !tipo)) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Se requiere patrón de búsqueda y tipo"
          }));
        case 4:
          // Definir variables para los resultados
          resultados = {
            barberos: [],
            servicios: [],
            productos: [],
            ofertas: [],
            ubicaciones: [],
            preguntas: []
          }; // Obtener todos los datos iniciales
          _context3.next = 7;
          return Promise.all([_mysqlDb.pool.query("CALL LL_VER_BARBERO()"), _mysqlDb.pool.query("CALL LL_VER_SERVICIOS()"), _mysqlDb.pool.query("CALL LL_VER_PRODUCTOS()"), _mysqlDb.pool.query("CALL LL_VER_OFERTAS()"), _mysqlDb.pool.query("CALL LL_VER_UBICACIONES()"), _mysqlDb.pool.query("CALL LL_VER_PREGUNTAS()")]);
        case 7:
          _yield$Promise$all3 = _context3.sent;
          _yield$Promise$all4 = (0, _slicedToArray2["default"])(_yield$Promise$all3, 6);
          _yield$Promise$all4$ = (0, _slicedToArray2["default"])(_yield$Promise$all4[0], 1);
          rowsBar = _yield$Promise$all4$[0];
          _yield$Promise$all4$2 = (0, _slicedToArray2["default"])(_yield$Promise$all4[1], 1);
          rowsSer = _yield$Promise$all4$2[0];
          _yield$Promise$all4$3 = (0, _slicedToArray2["default"])(_yield$Promise$all4[2], 1);
          rowsPro = _yield$Promise$all4$3[0];
          _yield$Promise$all4$4 = (0, _slicedToArray2["default"])(_yield$Promise$all4[3], 1);
          rowsOfe = _yield$Promise$all4$4[0];
          _yield$Promise$all4$5 = (0, _slicedToArray2["default"])(_yield$Promise$all4[4], 1);
          rowsUbi = _yield$Promise$all4$5[0];
          _yield$Promise$all4$6 = (0, _slicedToArray2["default"])(_yield$Promise$all4[5], 1);
          rowsPre = _yield$Promise$all4$6[0];
          barberos = rowsBar[0];
          servicios = rowsSer[0];
          productos = rowsPro[0];
          ofertas = rowsOfe[0];
          ubicaciones = rowsUbi[0];
          preguntas = rowsPre[0]; // Convertir imágenes para los datos iniciales
          barberos.forEach(function (barbero) {
            barbero.img64 = null;
            if (barbero.foto) {
              try {
                barbero.img64 = Buffer.from(barbero.foto).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64 (foto):', bufferError);
              }
            }
          });
          servicios.forEach(function (servicio) {
            servicio.img64 = null;
            if (servicio.fotoServicio) {
              try {
                servicio.img64 = Buffer.from(servicio.fotoServicio).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64 (fotoServicio):', bufferError);
              }
            }
          });
          productos.forEach(function (producto) {
            producto.img64 = null;
            if (producto.foto) {
              try {
                producto.img64 = Buffer.from(producto.foto).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64 (foto):', bufferError);
              }
            }
          });
          ofertas.forEach(function (oferta) {
            oferta.img64 = null;
            if (oferta.foto) {
              try {
                oferta.img64 = Buffer.from(oferta.foto).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64 (foto):', bufferError);
              }
            }
          });
          ubicaciones.forEach(function (ubicacion) {
            ubicacion.img64 = null;
            if (ubicacion.fotoUbicacion) {
              try {
                ubicacion.img64 = Buffer.from(ubicacion.fotoUbicacion).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64 (foto):', bufferError);
              }
            }
          });

          // Asignar los datos iniciales a los resultados
          resultados.barberos = rowsBar[0];
          resultados.servicios = rowsSer[0];
          resultados.productos = rowsPro[0];
          resultados.ofertas = rowsOfe[0];
          resultados.ubicaciones = rowsUbi[0];
          resultados.preguntas = rowsPre[0];
          console.log(resultados.barberos);
          // Realizar la búsqueda específica
          query = '';
          _context3.t0 = tipo;
          _context3.next = _context3.t0 === "barbero" ? 43 : _context3.t0 === "servicio" ? 45 : _context3.t0 === "producto" ? 47 : _context3.t0 === "oferta" ? 49 : _context3.t0 === "ubicacione" ? 51 : 53;
          break;
        case 43:
          query = "CALL LL_BUSCAR_BARBERO('".concat(desc, "')");
          return _context3.abrupt("break", 54);
        case 45:
          query = "CALL LL_BUSCAR_SERVICIO('".concat(desc, "')");
          return _context3.abrupt("break", 54);
        case 47:
          query = "CALL LL_BUSCAR_PRODUCTO('".concat(desc, "')");
          return _context3.abrupt("break", 54);
        case 49:
          query = "CALL LL_BUSCAR_OFERTA('".concat(desc, "')");
          return _context3.abrupt("break", 54);
        case 51:
          query = "CALL LL_BUSCAR_UBICACION('".concat(desc, "')");
          return _context3.abrupt("break", 54);
        case 53:
          return _context3.abrupt("return", res.status(400).json({
            message: "Tipo de búsqueda no válido"
          }));
        case 54:
          _context3.next = 56;
          return _mysqlDb.pool.query(query);
        case 56:
          _yield$pool$query3 = _context3.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          resulBusqueda = _yield$pool$query4[0];
          _context3.t1 = tipo;
          _context3.next = _context3.t1 === "barbero" ? 62 : _context3.t1 === "servicio" ? 64 : _context3.t1 === "producto" ? 66 : _context3.t1 === "oferta" ? 68 : _context3.t1 === "ubicacione" ? 70 : 72;
          break;
        case 62:
          resulBusqueda[0].forEach(function (barbero) {
            barbero.img64 = null;
            if (barbero.foto) {
              try {
                barbero.img64 = Buffer.from(barbero.foto).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64 (foto):', bufferError);
              }
            }
          });
          return _context3.abrupt("break", 72);
        case 64:
          resulBusqueda[0].forEach(function (servicio) {
            servicio.img64 = null;
            if (servicio.fotoServicio) {
              try {
                servicio.img64 = Buffer.from(servicio.fotoServicio).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64 (fotoServicio):', bufferError);
              }
            }
          });
          return _context3.abrupt("break", 72);
        case 66:
          resulBusqueda[0].forEach(function (producto) {
            producto.img64 = null;
            if (producto.foto) {
              try {
                producto.img64 = Buffer.from(producto.foto).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64 (foto):', bufferError);
              }
            }
          });
          return _context3.abrupt("break", 72);
        case 68:
          resulBusqueda[0].forEach(function (oferta) {
            oferta.img64 = null;
            if (oferta.foto) {
              try {
                oferta.img64 = Buffer.from(oferta.foto).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64 (foto):', bufferError);
              }
            }
          });
          return _context3.abrupt("break", 72);
        case 70:
          resulBusqueda[0].forEach(function (ubicacion) {
            ubicacion.img64 = null;
            if (ubicacion.foto) {
              try {
                ubicacion.img64 = Buffer.from(ubicacion.foto).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64 (foto):', bufferError);
              }
            }
          });
          return _context3.abrupt("break", 72);
        case 72:
          resultados[tipo + 's'] = resulBusqueda[0];
          res.json(resultados);
          _context3.next = 80;
          break;
        case 76:
          _context3.prev = 76;
          _context3.t2 = _context3["catch"](0);
          console.error('Error en buscar:', _context3.t2);
          res.status(500).json({
            message: _context3.t2.message
          });
        case 80:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 76]]);
  }));
  return function buscar(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para mostrar el calendario
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
//Perfil personal del barbero en el cual visualiza su calendario 
var verCalendario = exports.verCalendario = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, _yield$Promise$all5, _yield$Promise$all6, _yield$Promise$all6$, rowsBar, _yield$Promise$all6$2, rowsRes, reservasFormateadas, barberos;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params['id'];
          _context4.prev = 1;
          _context4.next = 4;
          return Promise.all([_mysqlDb.pool.query("CALL LL_VER_PERFIL_BARBERO('".concat(id, "');")), _mysqlDb.pool.query("CALL LL_VER_RESERVA_BARBERO('".concat(id, "');"))]);
        case 4:
          _yield$Promise$all5 = _context4.sent;
          _yield$Promise$all6 = (0, _slicedToArray2["default"])(_yield$Promise$all5, 2);
          _yield$Promise$all6$ = (0, _slicedToArray2["default"])(_yield$Promise$all6[0], 1);
          rowsBar = _yield$Promise$all6$[0];
          _yield$Promise$all6$2 = (0, _slicedToArray2["default"])(_yield$Promise$all6[1], 1);
          rowsRes = _yield$Promise$all6$2[0];
          reservasFormateadas = rowsRes[0].map(function (reserva) {
            return _objectSpread(_objectSpread({}, reserva), {}, {
              fecha: reserva.fecha.toISOString().split('T')[0],
              // Formato YYYY-MM-DD
              hora: reserva.hora.split('.')[0] // Formato HH:mm:ss
            });
          });
          barberos = rowsBar[0];
          barberos.forEach(function (barbero) {
            if (barbero.fotoPerfil) {
              try {
                barbero.img64 = Buffer.from(barbero.fotoPerfil).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64:', bufferError);
                barbero.img64 = null;
              }
            } else {
              barbero.img64 = null; // O algún valor predeterminado si la imagen no existe
            }
          });
          res.json({
            barberos: barberos,
            reservas: reservasFormateadas
          });
          _context4.next = 20;
          break;
        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](1);
          console.error(_context4.t0);
          res.status(500).json(_context4.t0);
        case 20:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 16]]);
  }));
  return function verCalendario(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para ver el perfil del barbero
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
//Perfil personal del barbero en el cual edita su información personal 
var perfilBarbero = exports.perfilBarbero = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, rows, barberos;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params['id'];
          _context5.prev = 1;
          _context5.next = 4;
          return _mysqlDb.pool.query("CALL LL_VER_PERFIL_BARBERO('".concat(id, "');"));
        case 4:
          rows = _context5.sent;
          barberos = rows[0][0];
          barberos.forEach(function (barbero) {
            if (barbero.fotoPerfil) {
              try {
                barbero.img64 = Buffer.from(barbero.fotoPerfil).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64:', bufferError);
                barbero.img64 = null;
              }
            } else {
              barbero.img64 = null;
            }
          });
          res.status(200).json({
            barberos: barberos
          });
          _context5.next = 13;
          break;
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](1);
          res.status(500).json(_context5.t0);
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 10]]);
  }));
  return function perfilBarbero(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para ver los barberos desde la vista del cliente
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
//Perfil del barbero desde la vista de clientes 
var verPerfilBarbero = exports.verPerfilBarbero = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, _yield$Promise$all7, _yield$Promise$all8, _yield$Promise$all8$, rowsBar, _yield$Promise$all8$2, rowsCom, barberos;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params['id'];
          _context6.prev = 1;
          _context6.next = 4;
          return Promise.all([_mysqlDb.pool.query("CALL LL_VER_PERFIL_BARBERO('".concat(id, "');")), _mysqlDb.pool.query("CALL LL_VER_COMENTARIO_BARBERO('".concat(id, "');"))]);
        case 4:
          _yield$Promise$all7 = _context6.sent;
          _yield$Promise$all8 = (0, _slicedToArray2["default"])(_yield$Promise$all7, 2);
          _yield$Promise$all8$ = (0, _slicedToArray2["default"])(_yield$Promise$all8[0], 1);
          rowsBar = _yield$Promise$all8$[0];
          _yield$Promise$all8$2 = (0, _slicedToArray2["default"])(_yield$Promise$all8[1], 1);
          rowsCom = _yield$Promise$all8$2[0];
          barberos = rowsBar[0];
          barberos.forEach(function (barbero) {
            if (barbero.fotoPerfil) {
              try {
                barbero.img64 = Buffer.from(barbero.fotoPerfil).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64:', bufferError);
                barbero.img64 = null;
              }
            } else {
              barbero.img64 = null;
            }
          });
          res.status(200).json({
            barberos: barberos,
            comentarios: rowsCom[0]
          });
          _context6.next = 18;
          break;
        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](1);
          res.status(500).json(_context6.t0);
        case 18:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 15]]);
  }));
  return function verPerfilBarbero(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para ver los barberos desde la vista del admin
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
//Perfil del barbero desde la vista de admins 
var verPerfilBarberoAdmin = exports.verPerfilBarberoAdmin = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, _yield$Promise$all9, _yield$Promise$all10, _yield$Promise$all10$, rowsBar, _yield$Promise$all10$2, rowsCom, barberos;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params['id'];
          _context7.prev = 1;
          _context7.next = 4;
          return Promise.all[(_mysqlDb.pool.query("CALL LL_VER_PERFIL_BARBERO('".concat(id, "');")), _mysqlDb.pool.query("CALL LL_VER_COMENTARIO_BARBERO('".concat(id, "');")))];
        case 4:
          _yield$Promise$all9 = _context7.sent;
          _yield$Promise$all10 = (0, _slicedToArray2["default"])(_yield$Promise$all9, 2);
          _yield$Promise$all10$ = (0, _slicedToArray2["default"])(_yield$Promise$all10[0], 1);
          rowsBar = _yield$Promise$all10$[0];
          _yield$Promise$all10$2 = (0, _slicedToArray2["default"])(_yield$Promise$all10[1], 1);
          rowsCom = _yield$Promise$all10$2[0];
          barberos = rowsBar[0][0];
          barberos.forEach(function (barbero) {
            if (barbero.fotoPerfil) {
              try {
                barbero.img64 = Buffer.from(barbero.fotoPerfil).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64:', bufferError);
                barbero.img64 = null;
              }
            } else {
              barbero.img64 = null;
            }
          });
          console.log(barberos);
          res.status(200).json({
            barberos: barberos,
            comentarios: rowsCom[0]
          });
          _context7.next = 19;
          break;
        case 16:
          _context7.prev = 16;
          _context7.t0 = _context7["catch"](1);
          res.status(500).json(_context7.t0);
        case 19:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 16]]);
  }));
  return function verPerfilBarberoAdmin(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();