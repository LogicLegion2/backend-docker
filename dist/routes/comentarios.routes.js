"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _comentariosControllers = require("../controllers/comentarios.controllers.js");
var _oauth = require("../middlewares/oauth.js");
/**
 * Estas son las rutas del backend de comentarios en mi proyecto 
 * @type {object}
 */
var rutaComentarios = (0, _express.Router)();
rutaComentarios.post("/crear", _comentariosControllers.crearComentario);
rutaComentarios.post("/eliminar", _comentariosControllers.eliminarComentario);
var _default = exports["default"] = rutaComentarios;