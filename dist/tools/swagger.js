"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _swaggerAutogen = _interopRequireDefault(require("swagger-autogen"));
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var port = process.env.PORT || 3000;
var doc = {
  info: {
    title: 'API Barbería',
    description: 'Gestión de citas'
  },
  host: 'localhost:' + port + '/'
};
var outputFile = './app/tools/swagger-output.json';
var routes = ['../routes/barbero.routes.js', '../routes/comentarios.routes.js', '../routes/favoritos.routes.js', '../routes/ofertas.routes.js', '../routes/preguntas.routes.js', '../routes/productos.routes.js', '../routes/reservas.routes.js', '../routes/servicios.routes.js', '../routes/ubicaciones.routes.js', '../routes/usuarios.routes.js', '../routes/ventas.routes.js'];
(0, _swaggerAutogen["default"])()(outputFile, routes, doc);