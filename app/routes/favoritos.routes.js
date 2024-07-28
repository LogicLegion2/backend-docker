import { Router } from "express";
import { crearBarberoFavorito, crearOfertaFavorito, crearProductoFavorito, crearServicioFavorito, listarFavoritos } from "../controllers/favoritos.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

/**
 * Estas son las rutas del backend de favoritos en mi proyecto 
 * @type {object}
 */
const rutaFavoritos = Router();

rutaFavoritos.get("/:id", listarFavoritos);
rutaFavoritos.post("/barbero/:barbero", crearBarberoFavorito);
rutaFavoritos.post("/servicio/:servicio", crearServicioFavorito);
rutaFavoritos.post("/oferta/:oferta", crearOfertaFavorito);
rutaFavoritos.post("/producto/:producto", crearProductoFavorito);

export default rutaFavoritos;