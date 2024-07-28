"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _ofertasControllers = require("../controllers/ofertas.controllers.js");
var _oauth = require("../middlewares/oauth.js");
/**
 * Estas son las rutas del backend de ofertas en mi proyecto 
 * @type {object}
 */
var rutaOfertas = (0, _express.Router)();
rutaOfertas.get("/", _ofertasControllers.listarOferta);
rutaOfertas.get("/buscar", _ofertasControllers.buscarOferta);
rutaOfertas.post("/crear", _ofertasControllers.crearOferta);
rutaOfertas.get("/obtener/:id", _ofertasControllers.obtenerOferta);
rutaOfertas.post("/editar", _ofertasControllers.editarOferta);
rutaOfertas.post("/desactivar", _ofertasControllers.desactivarOferta);
var _default = exports["default"] = rutaOfertas;