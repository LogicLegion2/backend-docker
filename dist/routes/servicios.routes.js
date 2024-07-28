"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _serviciosControllers = require("../controllers/servicios.controllers.js");
var _oauth = require("../middlewares/oauth.js");
/**
 * Estas son las rutas del backend de servicios en mi proyecto
 * @type {object}
 */
var rutaServicios = (0, _express.Router)();
rutaServicios.get("/", _serviciosControllers.listarServicio);
rutaServicios.get("/buscar", _serviciosControllers.buscarServicio);
rutaServicios.post("/crear", _serviciosControllers.crearServicio);
rutaServicios.get("/obtener/:id", _serviciosControllers.obtenerServicio);
rutaServicios.post("/editar", _serviciosControllers.editarServicio);
rutaServicios.post("/desactivar", _serviciosControllers.desactivarServicio);
var _default = exports["default"] = rutaServicios;