"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireWildcard(require("express"));
var _index = _interopRequireDefault(require("./routes/index"));
var _cors = _interopRequireDefault(require("cors"));
var _path = _interopRequireWildcard(require("path"));
var _url = require("url");
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _payment = _interopRequireDefault(require("./routes/payment.routes"));
var _morgan = _interopRequireDefault(require("morgan"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
_dotenv["default"].config(); // Carga las variables de entorno desde el archivo .env
var app = (0, _express["default"])(); // Crea una instancia de la aplicación Express

// Middleware para registrar las solicitudes HTTP en consola durante el desarrollo
app.use((0, _morgan["default"])("dev"));

// Middleware para permitir solicitudes CORS (Cross-Origin Resource Sharing)
app.use((0, _cors["default"])());

// Middleware para manejar JSON y formularios codificados en las solicitudes
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));

// Middleware para utilizar las rutas definidas en ./routes/index.js para gestionar las solicitudes
app.use("/", _index["default"]);

// Utilizar las rutas para pasarela de pagos en paypal
app.use(_payment["default"]);

// Middleware para manejar cookies en las solicitudes
app.use((0, _cookieParser["default"])());

// Establece el motor de plantillas y la ubicación de las vistas de EJS
app.set("view engine", "ejs");
app.set("views", _path["default"].join(__dirname, '../../frontend/src/views'));

// Middleware para servir archivos estáticos (CSS, imágenes, etc.) desde el directorio público
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../../frontend/src/public')));

// Establece el puerto en el que escuchará el servidor, usando el puerto definido en las variables de entorno o el puerto 3000 por defecto
app.set("port", process.env.PORT || 3000);
var _default = exports["default"] = app;