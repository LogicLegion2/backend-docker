"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _favoritosControllers = require("../controllers/favoritos.controllers.js");
var _oauth = require("../middlewares/oauth.js");
/**
 * Estas son las rutas del backend de favoritos en mi proyecto 
 * @type {object}
 */
var rutaFavoritos = (0, _express.Router)();
rutaFavoritos.get("/:id", _favoritosControllers.listarFavoritos);
rutaFavoritos.post("/barbero/:barbero", _favoritosControllers.crearBarberoFavorito);
rutaFavoritos.post("/servicio/:servicio", _favoritosControllers.crearServicioFavorito);
rutaFavoritos.post("/oferta/:oferta", _favoritosControllers.crearOfertaFavorito);
rutaFavoritos.post("/producto/:producto", _favoritosControllers.crearProductoFavorito);
var _default = exports["default"] = rutaFavoritos;