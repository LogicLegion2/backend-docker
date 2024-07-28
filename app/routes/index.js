import { Router, json } from "express";
import rutaProductos from "./productos.routes";
import rutaServicios from "./servicios.routes";
import rutaUsuarios from "./usuarios.routes";
import rutaUbicaciones from "./ubicaciones.routes";
import rutaBarberos from "./barbero.routes";
import rutaComentarios from "./comentarios.routes";
import rutaOfertas from "./ofertas.routes";
import rutaPreguntas from "./preguntas.routes";
import rutaReservaAdmin from "./reservas.routes";
import rutaVentas from "./ventas.routes";
import rutaFavoritos from "./favoritos.routes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from '../tools/swagger-output'

/**
 * Estas son las rutas del backend en mi proyecto 
 * @type {object}
 */
const ruta = Router();

ruta.use("/productos", rutaProductos)
ruta.use("/servicios", rutaServicios)
ruta.use("/usuarios", rutaUsuarios)
ruta.use("/ubicaciones", rutaUbicaciones)
ruta.use("/barberos", rutaBarberos)
ruta.use("/comentarios", rutaComentarios)
ruta.use("/ofertas", rutaOfertas)
ruta.use("/preguntas", rutaPreguntas)
ruta.use("/reservas", rutaReservaAdmin)
ruta.use("/ventas", rutaVentas)
ruta.use("/favoritos", rutaFavoritos)
ruta.use('/doc', swaggerUi.serve,
    swaggerUi.setup(swaggerFile)
)

export default ruta;