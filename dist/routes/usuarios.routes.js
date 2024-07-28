"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _usuariosControllers = require("../controllers/usuarios.controllers.js");
var _oauth = require("../middlewares/oauth.js");
/**
 * Estas son las rutas del backend de usuarios en mi proyecto
 * @type {object}
 */
var rutaUsuarios = (0, _express.Router)();
rutaUsuarios.get("/", _usuariosControllers.listarUsuario);
rutaUsuarios.get("/buscar", _usuariosControllers.buscarUsuario);
rutaUsuarios.get("/admin/:id", _usuariosControllers.verPerfilAdmin);
rutaUsuarios.get("/cliente/:id", _usuariosControllers.verPerfil);
rutaUsuarios.post("/login", _usuariosControllers.login);
rutaUsuarios.post("/registro", _usuariosControllers.registroUsuario);
rutaUsuarios.post("/registrar", _oauth.verificarToken, _usuariosControllers.crearUsuario);
rutaUsuarios.post("/barbero", _usuariosControllers.crearBarbero);
rutaUsuarios.post("/nombre/:id", _usuariosControllers.cambiarNombre);
rutaUsuarios.post("/telefono/:id", _usuariosControllers.cambiarTelefono);
rutaUsuarios.post("/correo/:id", _usuariosControllers.cambiarCorreo);
rutaUsuarios.post("/foto/:id", _usuariosControllers.cambiarFoto);
rutaUsuarios.post("/contrasena/:id", _usuariosControllers.cambiarContrasena);
rutaUsuarios.post("/nombre/barbero/:id", _usuariosControllers.cambiarNombreBarbero);
rutaUsuarios.post("/telefono/barbero/:id", _usuariosControllers.cambiarTelefonoBarbero);
rutaUsuarios.post("/correo/barbero/:id", _usuariosControllers.cambiarCorreoBarbero);
rutaUsuarios.post("/foto/barbero/:id", _usuariosControllers.cambiarFotoBarbero);
rutaUsuarios.post("/descripcion/:id", _usuariosControllers.cambiarDescripcionBarbero);
rutaUsuarios.post("/contrasena/barbero/:id", _usuariosControllers.cambiarContrasenaBarbero);
rutaUsuarios.post("/desactivar", _usuariosControllers.desactivarUsuario);
rutaUsuarios.post("/logout", _usuariosControllers.logout);
var _default = exports["default"] = rutaUsuarios;