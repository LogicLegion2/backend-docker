"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _preguntasControllers = require("../controllers/preguntas.controllers.js");
var _oauth = require("../middlewares/oauth.js");
/**
 * Estas son las rutas del backend de preguntas en mi proyecto 
 * @type {object}
 */
var rutaPreguntas = (0, _express.Router)();
rutaPreguntas.get("/", _preguntasControllers.listarPregunta);
rutaPreguntas.get("/buscar", _preguntasControllers.buscarPregunta);
rutaPreguntas.post("/crear", _preguntasControllers.crearPregunta);
rutaPreguntas.get("/obtener/:id", _preguntasControllers.obtenerPregunta);
rutaPreguntas.post("/editar", _preguntasControllers.editarPregunta);
rutaPreguntas.post("/desactivar", _preguntasControllers.desactivarPregunta);
var _default = exports["default"] = rutaPreguntas;