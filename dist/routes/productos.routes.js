"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _productosControllers = require("../controllers/productos.controllers.js");
var _oauth = require("../middlewares/oauth.js");
/**
 * Estas son las rutas del backend de productos en mi proyecto 
 * @type {object}
 */
var rutaProductos = (0, _express.Router)();
rutaProductos.get("/", _productosControllers.listarProducto);
rutaProductos.get("/vendidos", _productosControllers.listarProductosVendidos);
rutaProductos.get("/buscar", _productosControllers.buscarProducto);
rutaProductos.post("/crear", _productosControllers.crearProducto);
rutaProductos.get("/:id", _productosControllers.obtenerProducto);
rutaProductos.get("/obtener/:id", _productosControllers.obtenerProducto);
rutaProductos.post("/editar", _productosControllers.editarProducto);
rutaProductos.post("/desactivar", _productosControllers.desactivarProducto);
var _default = exports["default"] = rutaProductos;