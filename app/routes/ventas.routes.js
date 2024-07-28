import { Router } from "express";
import { agregarProductoCarrito, buscarProductoVendido, cancelarUltimaVenta, crearPago, crearReembolso, desactivarEntrega, desactivarProductoCarrito, historialCompra, reiniciarCarritoCompras, verCarroCompras, verEntregas, verEntregasAdmin, verificarStock, verReservasProductos } from "../controllers/ventas.controllers.js";
import { verificarToken } from "../middlewares/oauth.js";

/**
 * Estas son las rutas del backend de ventas en mi proyecto
 * @type {object}
 */
const rutaVentas = Router();

rutaVentas.post("/compra", crearPago);
rutaVentas.post("/stock", verificarStock);
rutaVentas.post("/ultima", cancelarUltimaVenta);
rutaVentas.post("/reiniciar", reiniciarCarritoCompras);
rutaVentas.post("/reembolso", crearReembolso);
rutaVentas.get("/historial/:id", historialCompra);
rutaVentas.get("/buscar", buscarProductoVendido);
rutaVentas.get("/entregas/admin", verEntregasAdmin);
rutaVentas.get("/entregas/:id", verEntregas);
rutaVentas.post("/desactivar", desactivarEntrega);
rutaVentas.post("/desactivar/carrito", desactivarProductoCarrito);
rutaVentas.get("/productos",verReservasProductos);
rutaVentas.post("/carrito/agregar/:producto", agregarProductoCarrito);
rutaVentas.get("/carrito/:id", verCarroCompras);

export default rutaVentas; 