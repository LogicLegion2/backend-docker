"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _productos = _interopRequireDefault(require("./productos.routes"));
var _servicios = _interopRequireDefault(require("./servicios.routes"));
var _usuarios = _interopRequireDefault(require("./usuarios.routes"));
var _ubicaciones = _interopRequireDefault(require("./ubicaciones.routes"));
var _barbero = _interopRequireDefault(require("./barbero.routes"));
var _comentarios = _interopRequireDefault(require("./comentarios.routes"));
var _ofertas = _interopRequireDefault(require("./ofertas.routes"));
var _preguntas = _interopRequireDefault(require("./preguntas.routes"));
var _reservas = _interopRequireDefault(require("./reservas.routes"));
var _ventas = _interopRequireDefault(require("./ventas.routes"));
var _favoritos = _interopRequireDefault(require("./favoritos.routes"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerOutput = _interopRequireDefault(require("../tools/swagger-output"));
/**
 * Estas son las rutas del backend en mi proyecto 
 * @type {object}
 */
var ruta = (0, _express.Router)();
ruta.use("/productos", _productos["default"]);
ruta.use("/servicios", _servicios["default"]);
ruta.use("/usuarios", _usuarios["default"]);
ruta.use("/ubicaciones", _ubicaciones["default"]);
ruta.use("/barberos", _barbero["default"]);
ruta.use("/comentarios", _comentarios["default"]);
ruta.use("/ofertas", _ofertas["default"]);
ruta.use("/preguntas", _preguntas["default"]);
ruta.use("/reservas", _reservas["default"]);
ruta.use("/ventas", _ventas["default"]);
ruta.use("/favoritos", _favoritos["default"]);
ruta.use('/doc', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swaggerOutput["default"]));
var _default = exports["default"] = ruta;