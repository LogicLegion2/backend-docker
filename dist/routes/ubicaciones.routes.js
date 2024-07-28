"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _ubicacionesControllers = require("../controllers/ubicaciones.controllers.js");
var _oauth = require("../middlewares/oauth.js");
/**
 * Estas son las rutas del backend de ubicaciones en mi proyecto
 * @type {object}
 */
var rutaUbicaciones = (0, _express.Router)();
rutaUbicaciones.get("/", _ubicacionesControllers.listarUbicacion);
rutaUbicaciones.get("/buscar", _ubicacionesControllers.buscarUbicacion);
rutaUbicaciones.post("/crear", _ubicacionesControllers.crearUbicacion);
rutaUbicaciones.get("/obtener/:id", _ubicacionesControllers.obtenerUbicacion);
rutaUbicaciones.post("/editar", _ubicacionesControllers.editarUbicacion);
rutaUbicaciones.post("/desactivar", _ubicacionesControllers.desactivarUbicacion);
var _default = exports["default"] = rutaUbicaciones;