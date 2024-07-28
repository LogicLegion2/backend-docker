"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _barberoControllers = require("../controllers/barbero.controllers.js");
var _oauth = require("../middlewares/oauth.js");
/**
 * Estas son las rutas del backend de barberos en mi proyecto 
 * @type {object}
 */
var rutaBarberos = (0, _express.Router)();
rutaBarberos.get("/", _barberoControllers.listarBarbero);
rutaBarberos.get("/admin", _barberoControllers.listarBarberoAdmin);
rutaBarberos.get("/calendario/:id", _barberoControllers.verCalendario);
rutaBarberos.get("/barbero/:id", _barberoControllers.verPerfilBarbero);
rutaBarberos.get("/admin/:id", _barberoControllers.verPerfilBarberoAdmin);
rutaBarberos.get("/perfil/:id", _barberoControllers.perfilBarbero);
rutaBarberos.get("/buscar", _barberoControllers.buscar);
var _default = exports["default"] = rutaBarberos;