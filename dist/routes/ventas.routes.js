"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _ventasControllers = require("../controllers/ventas.controllers.js");
var _oauth = require("../middlewares/oauth.js");
/**
 * Estas son las rutas del backend de ventas en mi proyecto
 * @type {object}
 */
var rutaVentas = (0, _express.Router)();
rutaVentas.post("/compra", _ventasControllers.crearPago);
rutaVentas.post("/stock", _ventasControllers.verificarStock);
rutaVentas.post("/ultima", _ventasControllers.cancelarUltimaVenta);
rutaVentas.post("/reiniciar", _ventasControllers.reiniciarCarritoCompras);
rutaVentas.post("/reembolso", _ventasControllers.crearReembolso);
rutaVentas.get("/historial/:id", _ventasControllers.historialCompra);
rutaVentas.get("/buscar", _ventasControllers.buscarProductoVendido);
rutaVentas.get("/entregas/admin", _ventasControllers.verEntregasAdmin);
rutaVentas.get("/entregas/:id", _ventasControllers.verEntregas);
rutaVentas.post("/desactivar", _ventasControllers.desactivarEntrega);
rutaVentas.post("/desactivar/carrito", _ventasControllers.desactivarProductoCarrito);
rutaVentas.get("/productos", _ventasControllers.verReservasProductos);
rutaVentas.post("/carrito/agregar/:producto", _ventasControllers.agregarProductoCarrito);
rutaVentas.get("/carrito/:id", _ventasControllers.verCarroCompras);
var _default = exports["default"] = rutaVentas;