import { Router } from "express";
import { buscarProducto, crearProducto, desactivarProducto, editarProducto, listarProducto, listarProductosVendidos, obtenerProducto } from "../controllers/productos.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";


/**
 * Estas son las rutas del backend de productos en mi proyecto 
 * @type {object}
 */
const rutaProductos = Router();

rutaProductos.get("/", listarProducto);
rutaProductos.get("/vendidos", listarProductosVendidos);
rutaProductos.get("/buscar", buscarProducto);
rutaProductos.post("/crear", crearProducto);
rutaProductos.get("/:id", obtenerProducto);
rutaProductos.get("/obtener/:id", obtenerProducto);
rutaProductos.post("/editar", editarProducto);
rutaProductos.post("/desactivar", desactivarProducto);

export default rutaProductos;