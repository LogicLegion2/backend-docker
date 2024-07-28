"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verPerfilAdmin = exports.verPerfil = exports.registroUsuario = exports.logout = exports.login = exports.listarUsuario = exports.desactivarUsuario = exports.crearUsuario = exports.crearBarbero = exports.cambiarTelefonoBarbero = exports.cambiarTelefono = exports.cambiarNombreBarbero = exports.cambiarNombre = exports.cambiarFotoBarbero = exports.cambiarFoto = exports.cambiarDescripcionBarbero = exports.cambiarCorreoBarbero = exports.cambiarCorreo = exports.cambiarContrasenaBarbero = exports.cambiarContrasena = exports.buscarUsuario = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysqlDb = require("../config/mysql.db.js");
var _dotenv = require("dotenv");
var _promise = _interopRequireDefault(require("mysql2/promise"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcrypt = _interopRequireWildcard(require("bcrypt"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * Este es el controlador de usuarios
 * @module ctr-usuarios
 */

(0, _dotenv.config)();
var saltRounds = 10; // Define el número de rondas de salt para el hash

/**
 * Esta funcion sirve para mostrar todos los usuarios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var listarUsuario = exports.listarUsuario = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _yield$pool$query, _yield$pool$query2, rows;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _mysqlDb.pool.query("CALL LL_VER_USUARIOS()");
        case 3:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          rows = _yield$pool$query2[0];
          res.status(200).json({
            usuarios: rows[0]
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
  return function listarUsuario(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para buscar los usuarios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var buscarUsuario = exports.buscarUsuario = /*#__PURE__*/function () {
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
          return _mysqlDb.pool.query("CALL LL_BUSCAR_USUARIO('".concat(desc, "')"));
        case 6:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          res.status(200).json({
            usuarios: rows[0]
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
  return function buscarUsuario(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para crear los usuarios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var crearUsuario = exports.crearUsuario = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, nombre, correo, contrasena, telefono, rol, foto, hashedPassword, resultado;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, nombre = _req$body.nombre, correo = _req$body.correo, contrasena = _req$body.contrasena, telefono = _req$body.telefono, rol = _req$body.rol, foto = _req$body.foto;
          _context3.prev = 1;
          _context3.next = 4;
          return _bcrypt["default"].hash(contrasena, saltRounds);
        case 4:
          hashedPassword = _context3.sent;
          _context3.next = 7;
          return _mysqlDb.pool.query("CALL LL_INSERTAR_USUARIO('".concat(nombre, "','").concat(correo, "','").concat(hashedPassword, "','").concat(telefono, "','").concat(rol, "','").concat(foto, "')"));
        case 7:
          resultado = _context3.sent;
          console.log(resultado);
          res.status(200).json({
            message: "Usuario creado con éxito",
            id: resultado.insertId
          });
          _context3.next = 15;
          break;
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](1);
          res.status(500).json({
            error: "Error en el servidor, por favor inténtalo de nuevo más tarde"
          });
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return function crearUsuario(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para crear los barberos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var crearBarbero = exports.crearBarbero = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body2, nombre, correo, contrasena, telefono, descripcion, fotoPerfil, hashedPassword, resultado;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, nombre = _req$body2.nombre, correo = _req$body2.correo, contrasena = _req$body2.contrasena, telefono = _req$body2.telefono, descripcion = _req$body2.descripcion, fotoPerfil = _req$body2.fotoPerfil;
          _context4.prev = 1;
          _context4.next = 4;
          return _bcrypt["default"].hash(contrasena, saltRounds);
        case 4:
          hashedPassword = _context4.sent;
          _context4.next = 7;
          return _mysqlDb.pool.query("CALL LL_INSERTAR_BARBERO('".concat(nombre, "','").concat(correo, "','").concat(hashedPassword, "','").concat(telefono, "','").concat(descripcion, "','").concat(fotoPerfil, "')"));
        case 7:
          resultado = _context4.sent;
          res.status(200).json({
            message: "Usuario creado con éxito",
            id: resultado.insertId
          });
          _context4.next = 15;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](1);
          console.error(_context4.t0);
          res.status(500).json({
            error: "Error en el servidor, por favor inténtalo de nuevo más tarde"
          });
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 11]]);
  }));
  return function crearBarbero(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Esta funcion sirve para registrar los usuarios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var registroUsuario = exports.registroUsuario = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body3, nombre, correo, contrasena, telefono, saltRounds, hashedPassword, resultado;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body3 = req.body, nombre = _req$body3.nombre, correo = _req$body3.correo, contrasena = _req$body3.contrasena, telefono = _req$body3.telefono;
          saltRounds = 10;
          _context5.prev = 2;
          _context5.next = 5;
          return _bcrypt["default"].hash(contrasena, saltRounds);
        case 5:
          hashedPassword = _context5.sent;
          _context5.next = 8;
          return _mysqlDb.pool.query("CALL LL_REGISTRO_CLIENTE('".concat(nombre, "','").concat(correo, "','").concat(hashedPassword, "','").concat(telefono, "')"));
        case 8:
          resultado = _context5.sent;
          res.status(200).json({
            message: "Usuario creado con éxito",
            resultado: resultado
          });
          _context5.next = 16;
          break;
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](2);
          console.error(_context5.t0);
          res.status(500).json({
            error: "Error en el servidor, por favor inténtalo de nuevo más tarde"
          });
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[2, 12]]);
  }));
  return function registroUsuario(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para loguearse
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var login = exports.login = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$body4, correo, contrasena, respuesta, usuario, password, match, idUsuario, rol, respuestaBar, barbero, payload, token;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$body4 = req.body, correo = _req$body4.correo, contrasena = _req$body4.contrasena;
          if (!(!correo || !contrasena)) {
            _context6.next = 3;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            error: true,
            message: "El correo y la contraseña son requeridos"
          }));
        case 3:
          _context6.prev = 3;
          _context6.next = 6;
          return _mysqlDb.pool.query("CALL LL_LOGIN('".concat(correo, "')"));
        case 6:
          respuesta = _context6.sent;
          if (!(respuesta[0][0].length === 0)) {
            _context6.next = 9;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            error: true,
            message: "El usuario ingresado no existe"
          }));
        case 9:
          usuario = respuesta[0][0][0];
          password = usuario.contrasena;
          _context6.next = 13;
          return _bcrypt["default"].compare(contrasena, password);
        case 13:
          match = _context6.sent;
          if (match) {
            _context6.next = 16;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            error: true,
            message: "Contraseña incorrecta"
          }));
        case 16:
          idUsuario = usuario.idUsuario;
          rol = usuario.rol;
          if (!(rol === "barbero")) {
            _context6.next = 26;
            break;
          }
          _context6.next = 21;
          return _mysqlDb.pool.query("CALL LL_OBTENER_BARBERO('".concat(idUsuario, "')"));
        case 21:
          respuestaBar = _context6.sent;
          if (!(respuestaBar[0][0].length === 0)) {
            _context6.next = 24;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            error: true,
            message: "El barbero no existe"
          }));
        case 24:
          barbero = respuestaBar[0][0][0];
          idUsuario = barbero.id;
        case 26:
          payload = {
            idUsuario: usuario.idUsuario,
            nombre: usuario.nombre,
            correo: usuario.correo,
            contrasena: usuario.contrasena,
            rol: usuario.rol
          };
          token = _jsonwebtoken["default"].sign(payload, process.env.TOKEN_PRIVATEKEY, {
            expiresIn: process.env.TOKEN_EXPIRES_IN
          });
          res.status(200).json({
            error: false,
            token: token,
            id: idUsuario,
            rol: rol
          });
          _context6.next = 34;
          break;
        case 31:
          _context6.prev = 31;
          _context6.t0 = _context6["catch"](3);
          res.status(500).json({
            error: true,
            message: "Error interno del servidor"
          });
        case 34:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[3, 31]]);
  }));
  return function login(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para cambiar el nombre del usuario
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var cambiarNombre = exports.cambiarNombre = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, nombre, respuesta;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          id = req.body.id;
          nombre = req.body.nombre;
          _context7.prev = 2;
          _context7.next = 5;
          return _mysqlDb.pool.query("CALL LL_EDITAR_NOMBRE_USUARIO('".concat(id, "','").concat(nombre, "');"));
        case 5:
          respuesta = _context7.sent;
          res.status(200).json(respuesta);
          _context7.next = 12;
          break;
        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](2);
          res.status(500).json(_context7.t0);
        case 12:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[2, 9]]);
  }));
  return function cambiarNombre(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para cambiar el telefono del usuario
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var cambiarTelefono = exports.cambiarTelefono = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var id, telefono, respuesta;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          id = req.body.id;
          telefono = req.body.telefono;
          _context8.prev = 2;
          _context8.next = 5;
          return _mysqlDb.pool.query("CALL LL_EDITAR_TELEFONO_USUARIO('".concat(id, "','").concat(telefono, "');"));
        case 5:
          respuesta = _context8.sent;
          res.status(200).json(respuesta);
          _context8.next = 12;
          break;
        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](2);
          res.status(500).json(_context8.t0);
        case 12:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[2, 9]]);
  }));
  return function cambiarTelefono(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para cambiar el correo del usuario
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var cambiarCorreo = exports.cambiarCorreo = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var id, correo, respuesta;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          id = req.body.id;
          correo = req.body.correo;
          _context9.prev = 2;
          _context9.next = 5;
          return _mysqlDb.pool.query("CALL LL_EDITAR_CORREO_USUARIO('".concat(id, "','").concat(correo, "');"));
        case 5:
          respuesta = _context9.sent;
          res.status(200).json(respuesta);
          _context9.next = 12;
          break;
        case 9:
          _context9.prev = 9;
          _context9.t0 = _context9["catch"](2);
          res.status(500).json(_context9.t0);
        case 12:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[2, 9]]);
  }));
  return function cambiarCorreo(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para cambiar la foto de perfil
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var cambiarFoto = exports.cambiarFoto = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var id, foto, respuesta;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          id = req.body.id;
          foto = req.body.foto;
          _context10.prev = 2;
          _context10.next = 5;
          return _mysqlDb.pool.query("CALL LL_EDITAR_FOTO_PERFIL('".concat(id, "','").concat(foto, "');"));
        case 5:
          respuesta = _context10.sent;
          res.status(200).json(respuesta);
          _context10.next = 12;
          break;
        case 9:
          _context10.prev = 9;
          _context10.t0 = _context10["catch"](2);
          res.status(500).json(_context10.t0);
        case 12:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[2, 9]]);
  }));
  return function cambiarFoto(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para cambiar la contraseña del cliente
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var cambiarContrasena = exports.cambiarContrasena = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var id, contrasena, contrasenaNueva, respuesta, usuario, match, hashedPassword, respuestaFinal;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          id = req.body.id;
          contrasena = req.body.contrasena;
          contrasenaNueva = req.body.contrasenaNueva;
          _context11.prev = 3;
          _context11.next = 6;
          return _mysqlDb.pool.query("CALL LL_VER_PERFIL_CLIENTE('".concat(id, "')"));
        case 6:
          respuesta = _context11.sent;
          usuario = respuesta[0][0][0];
          if (usuario) {
            _context11.next = 10;
            break;
          }
          return _context11.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado'
          }));
        case 10:
          _context11.next = 12;
          return _bcrypt["default"].compare(contrasena, usuario.contrasena);
        case 12:
          match = _context11.sent;
          if (match) {
            _context11.next = 15;
            break;
          }
          return _context11.abrupt("return", res.status(401).json({
            message: 'Contraseña actual incorrecta'
          }));
        case 15:
          _context11.next = 17;
          return _bcrypt["default"].hash(contrasenaNueva, saltRounds);
        case 17:
          hashedPassword = _context11.sent;
          _context11.next = 20;
          return _mysqlDb.pool.query("CALL LL_EDITAR_CONTRASENA_USUARIO('".concat(id, "','").concat(hashedPassword, "')"));
        case 20:
          respuestaFinal = _context11.sent;
          res.status(200).json({
            respuestaFinal: respuestaFinal
          });
          _context11.next = 27;
          break;
        case 24:
          _context11.prev = 24;
          _context11.t0 = _context11["catch"](3);
          res.status(500).json(_context11.t0);
        case 27:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[3, 24]]);
  }));
  return function cambiarContrasena(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para cambiar el nombre de los barberos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var cambiarNombreBarbero = exports.cambiarNombreBarbero = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var id, nombre, respuesta;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          // Edición de perfiles para barberos
          id = req.body.id;
          nombre = req.body.nombre;
          _context12.prev = 2;
          _context12.next = 5;
          return _mysqlDb.pool.query("CALL LL_EDITAR_NOMBRE_BARBERO('".concat(id, "','").concat(nombre, "');"));
        case 5:
          respuesta = _context12.sent;
          res.status(200).json(respuesta);
          _context12.next = 12;
          break;
        case 9:
          _context12.prev = 9;
          _context12.t0 = _context12["catch"](2);
          res.status(500).json(_context12.t0);
        case 12:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[2, 9]]);
  }));
  return function cambiarNombreBarbero(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para cambiar el telefono de los barberos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var cambiarTelefonoBarbero = exports.cambiarTelefonoBarbero = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var id, telefono, respuesta;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          id = req.body.id;
          telefono = req.body.telefono;
          _context13.prev = 2;
          _context13.next = 5;
          return _mysqlDb.pool.query("CALL LL_EDITAR_TELEFONO_BARBERO('".concat(id, "','").concat(telefono, "');"));
        case 5:
          respuesta = _context13.sent;
          res.status(200).json(respuesta);
          _context13.next = 12;
          break;
        case 9:
          _context13.prev = 9;
          _context13.t0 = _context13["catch"](2);
          res.status(500).json(_context13.t0);
        case 12:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[2, 9]]);
  }));
  return function cambiarTelefonoBarbero(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para cambiar el correo de los barberos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var cambiarCorreoBarbero = exports.cambiarCorreoBarbero = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var id, correo, respuesta;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          id = req.body.id;
          correo = req.body.correo;
          _context14.prev = 2;
          _context14.next = 5;
          return _mysqlDb.pool.query("CALL LL_EDITAR_CORREO_BARBERO('".concat(id, "','").concat(correo, "');"));
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
  return function cambiarCorreoBarbero(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para cambiar la foto de los barberos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var cambiarFotoBarbero = exports.cambiarFotoBarbero = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
    var id, foto, respuesta;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          id = req.body.id;
          foto = req.body.foto;
          _context15.prev = 2;
          _context15.next = 5;
          return _mysqlDb.pool.query("CALL LL_EDITAR_FOTO_PERFIL_BARBERO('".concat(id, "','").concat(foto, "');"));
        case 5:
          respuesta = _context15.sent;
          res.status(200).json(respuesta);
          _context15.next = 12;
          break;
        case 9:
          _context15.prev = 9;
          _context15.t0 = _context15["catch"](2);
          res.status(500).json(_context15.t0);
        case 12:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[2, 9]]);
  }));
  return function cambiarFotoBarbero(_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para cambiar la descripcion de los barberos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var cambiarDescripcionBarbero = exports.cambiarDescripcionBarbero = /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
    var id, descripcion, respuesta;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          id = req.body.id;
          descripcion = req.body.descripcion;
          _context16.prev = 2;
          _context16.next = 5;
          return _mysqlDb.pool.query("CALL LL_EDITAR_DESCRIPCION_BARBERO('".concat(id, "','").concat(descripcion, "');"));
        case 5:
          respuesta = _context16.sent;
          res.status(200).json(respuesta);
          _context16.next = 12;
          break;
        case 9:
          _context16.prev = 9;
          _context16.t0 = _context16["catch"](2);
          res.status(500).json(_context16.t0);
        case 12:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[2, 9]]);
  }));
  return function cambiarDescripcionBarbero(_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para cambiar la contraseña de los barberos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var cambiarContrasenaBarbero = exports.cambiarContrasenaBarbero = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
    var id, contrasena, contrasenaNueva, respuesta, usuario, match, hashedPassword, respuestaFinal;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          id = req.body.id;
          contrasena = req.body.contrasena;
          contrasenaNueva = req.body.contrasenaNueva;
          _context17.prev = 3;
          _context17.next = 6;
          return _mysqlDb.pool.query("CALL LL_VER_PERFIL_BARBERO('".concat(id, "')"));
        case 6:
          respuesta = _context17.sent;
          usuario = respuesta[0][0][0];
          if (usuario) {
            _context17.next = 10;
            break;
          }
          return _context17.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado'
          }));
        case 10:
          _context17.next = 12;
          return _bcrypt["default"].compare(contrasena, usuario.contrasena);
        case 12:
          match = _context17.sent;
          if (match) {
            _context17.next = 15;
            break;
          }
          return _context17.abrupt("return", res.status(401).json({
            message: 'Contraseña actual incorrecta'
          }));
        case 15:
          _context17.next = 17;
          return _bcrypt["default"].hash(contrasenaNueva, saltRounds);
        case 17:
          hashedPassword = _context17.sent;
          _context17.next = 20;
          return _mysqlDb.pool.query("CALL LL_EDITAR_CONTRASENA_BARBERO('".concat(id, "','").concat(hashedPassword, "')"));
        case 20:
          respuestaFinal = _context17.sent;
          res.status(200).json({
            respuestaFinal: respuestaFinal
          });
          _context17.next = 27;
          break;
        case 24:
          _context17.prev = 24;
          _context17.t0 = _context17["catch"](3);
          res.status(500).json(_context17.t0);
        case 27:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[3, 24]]);
  }));
  return function cambiarContrasenaBarbero(_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para desactivar los usuarios
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var desactivarUsuario = exports.desactivarUsuario = /*#__PURE__*/function () {
  var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req, res) {
    var id, respuesta;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          id = req.body.id;
          _context18.prev = 1;
          _context18.next = 4;
          return _mysqlDb.pool.query("CALL LL_DESACTIVAR_USUARIO('".concat(id, "');"));
        case 4:
          respuesta = _context18.sent;
          res.status(200).json(respuesta);
          _context18.next = 11;
          break;
        case 8:
          _context18.prev = 8;
          _context18.t0 = _context18["catch"](1);
          res.status(500).json(_context18.t0);
        case 11:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[1, 8]]);
  }));
  return function desactivarUsuario(_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para ver el perfil del cliente
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var verPerfil = exports.verPerfil = /*#__PURE__*/function () {
  var _ref19 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(req, res) {
    var id, rows, clientes;
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          id = req.params['id'];
          _context19.prev = 1;
          _context19.next = 4;
          return _mysqlDb.pool.query("CALL LL_VER_PERFIL_CLIENTE('".concat(id, "');"));
        case 4:
          rows = _context19.sent;
          clientes = rows[0][0];
          clientes.forEach(function (cliente) {
            if (cliente.foto) {
              try {
                cliente.img64 = Buffer.from(cliente.foto).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64:', bufferError);
                cliente.img64 = null;
              }
            } else {
              cliente.img64 = null;
            }
          });
          res.status(200).json({
            clientes: clientes
          });
          _context19.next = 13;
          break;
        case 10:
          _context19.prev = 10;
          _context19.t0 = _context19["catch"](1);
          res.status(500).json(_context19.t0);
        case 13:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[1, 10]]);
  }));
  return function verPerfil(_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para ver el perfil del admin
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var verPerfilAdmin = exports.verPerfilAdmin = /*#__PURE__*/function () {
  var _ref20 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(req, res) {
    var id, rows, admins;
    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          id = req.params['id'];
          _context20.prev = 1;
          _context20.next = 4;
          return _mysqlDb.pool.query("CALL LL_VER_PERFIL_CLIENTE('".concat(id, "');"));
        case 4:
          rows = _context20.sent;
          admins = rows[0][0];
          admins.forEach(function (admin) {
            if (admin.foto) {
              try {
                admin.img64 = Buffer.from(admin.foto).toString('base64');
              } catch (bufferError) {
                console.error('Error al convertir la imagen a base64:', bufferError);
                admin.img64 = null;
              }
            } else {
              admin.img64 = null;
            }
          });
          res.status(200).json({
            admins: admins
          });
          _context20.next = 13;
          break;
        case 10:
          _context20.prev = 10;
          _context20.t0 = _context20["catch"](1);
          res.status(500).json(_context20.t0);
        case 13:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[1, 10]]);
  }));
  return function verPerfilAdmin(_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para obtener un token de acceso
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
var logout = exports.logout = /*#__PURE__*/function () {
  var _ref21 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(req, res) {
    var token, decoded, respuesta;
    return _regenerator["default"].wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          token = req.headers["x-access-token"];
          if (token) {
            _context21.next = 3;
            break;
          }
          return _context21.abrupt("return", res.json("No se ha proporcionado un token"));
        case 3:
          _context21.prev = 3;
          decoded = _jsonwebtoken["default"].verify(token, process.env.TOKEN_PRIVATEKEY); // Almacena el token inválido en la base de datos
          _context21.next = 7;
          return _mysqlDb.pool.query('INSERT INTO tokensinvalidos (token, expiracion) VALUES (?, ?)', [token, new Date()]);
        case 7:
          respuesta = _context21.sent;
          res.status(200).json({
            respuesta: respuesta
          });
          _context21.next = 14;
          break;
        case 11:
          _context21.prev = 11;
          _context21.t0 = _context21["catch"](3);
          res.status(500).json(_context21.t0);
        case 14:
        case "end":
          return _context21.stop();
      }
    }, _callee21, null, [[3, 11]]);
  }));
  return function logout(_x41, _x42) {
    return _ref21.apply(this, arguments);
  };
}();