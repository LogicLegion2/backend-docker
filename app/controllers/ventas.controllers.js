/**
 * Este es el controlador de ventas
 * @module ctr-ventas
 */

import { pool } from "../config/mysql.db.js";
import { config } from "dotenv";
import dayjs from 'dayjs';
import 'dayjs/locale/es.js';
import mysql from "mysql2/promise";
config();

dayjs.locale('es'); // Establece el idioma a español

/**
 * Esta funcion sirve para crear un pago
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const verificarStock = async (req, res) => {
    const { productos } = req.body;
    try {
        for (const producto of productos) {
            const [stockResponse] = await pool.query(`CALL LL_VERIFICAR_STOCK('${producto.idProducto}')`);
            const stockDisponible = stockResponse[0][0].cantidad;

            if (stockDisponible < producto.cantidad) {
                return res.status(400).json({ error: `No hay suficiente stock para el producto: ${producto.producto}` });
            }
        }
        res.status(200).json({ message: 'Operación realizada con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al comparar stock' });
    }
};

/**
 * Esta funcion sirve para crear un pago
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const crearPago = async (req, res) => {
    const { id, productos, totalGlobal, metodoEntrega, direccion } = req.body;
    try {
        const [ventaResponse] = await pool.query(`CALL LL_INSERTAR_VENTA('${id}', '${totalGlobal}', '${metodoEntrega}', '${direccion}');`);
        const [idResponse] = await pool.query(`CALL LL_ULTIMO_ID_VENTA();`);
        const idVenta = idResponse[0][0].idVenta;

        for (const producto of productos) {
            await pool.query(`CALL LL_INSERTAR_PRODUCTO_VENTA('${producto.idProducto}', '${idVenta}', '${producto.cantidad}');`);
        }

        res.status(200).json({ message: 'Compra realizada con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar la compra' });
    }
};


/**
 * Esta funcion sirve para cancelar la última venta realizada
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const cancelarUltimaVenta = async (req, res) => {
    const { id } = req.body;
    try {
        const [response] = await pool.query(`CALL LL_CANCELAR_ULTIMA_VENTA('${id}');`);

        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar la compra' });
    }
};

/**
 * Esta funcion sirve para crear un reembolso
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const crearReembolso = async (req, res) => {
    const idUsuario = req.body.idUsuario;
    const idVenta = req.body.idVenta;

    try {
        const [respuesta] = await pool.query(`CALL LL_INSERTAR_REEMBOLSO('${idUsuario}','${idVenta}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para buscar un producto vendido
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const buscarProductoVendido = async (req, res) => {
    const { desc } = req.query;
    try {
        if (!desc) {
            return res.status(400).json({ message: "Se requiere patrón de búsqueda" });
        }
        const [rows] = await pool.query(`CALL LL_BUSCAR_VENDIDO('${desc}')`);
        const productos = rows[0];

        productos.forEach(producto => {
            if (producto.foto) {
                try {
                    producto.img64 = Buffer.from(producto.foto).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    producto.img64 = null;
                }
            } else {
                producto.img64 = null;
            }
        });
        res.status(200).json({ productos: productos });
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para ver el historial de compras
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const historialCompra = async (req, res) => {
    const id = req.params['id']
    try {
        const [rows] = await pool.query(`CALL LL_VER_HISTORIAL_COMPRAS('${id}')`);
        const compras = rows[0].map(compra => {
            const fecha = new Date(compra.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            return {
                ...compra,
                fecha
            };
        });
        compras.forEach(compra => {
            if (compra.foto) {
                try {
                    compra.img64 = Buffer.from(compra.foto).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    compra.img64 = null;
                }
            } else {
                compra.img64 = null; // O algún valor predeterminado si la imagen no existe
            }
        });
        res.status(200).json({ compras });
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para ver el carrito de compras
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const verCarroCompras = async (req, res) => {
    const id = req.params['id']

    try {
        const respuesta = await pool.query(`CALL LL_VER_CARRITO_COMPRAS('${id}');`);
        const productos = respuesta[0][0]
        productos.forEach(producto => {
            if (producto.fotoProducto) {
                try {
                    producto.img64 = Buffer.from(producto.fotoProducto).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    producto.img64 = null;
                }
            } else {
                producto.img64 = null;
            }
        });
        res.status(200).json({ productos });
    } catch (error) {
        res.status(500).json(error);
    }
}

/**
 * Esta funcion sirve para limpiar la lista de productos en el carrito de compras
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const reiniciarCarritoCompras = async (req, res) => {
    const { id } = req.body;
    console.log(id);
    try {
        const [response] = await pool.query(`CALL LL_REINICIAR_CARRITO('${id}');`);

        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar la compra' });
    }
};

/**
 * Esta funcion sirve para que el admin ver las entregas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const verEntregasAdmin = async (req, res) => {
    try {
        const rows = await pool.query(`CALL LL_VER_ENTREGAS_ADMIN()`);
        const entregas = rows[0][0].map(entrega => {
            const fecha = new Date(entrega.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            return {
                ...entrega,
                fecha
            };
        });
        res.status(200).json({ entregas });
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para ver las entregas
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const verEntregas = async (req, res) => {
    const id = req.params['id']
    try {
        const [rows] = await pool.query(`CALL LL_VER_ENTREGAS('${id}')`);
        const entregas = rows[0].map(entrega => {
            const fecha = new Date(entrega.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            return {
                ...entrega,
                fecha
            };
        });
        res.status(200).json({ entregas });
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para ver las reservas de los productos
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const verReservasProductos = async (req, res) => {
    try {
        const [rows] = await pool.query(`CALL LL_VER_RESERVAS_PRODUCTOS()`);
        const productos = rows[0];

        productos.forEach(producto => {
            if (producto.foto) {
                try {
                    producto.img64 = Buffer.from(producto.foto).toString('base64');
                } catch (bufferError) {
                    console.error('Error al convertir la imagen a base64:', bufferError);
                    producto.img64 = null;
                }
            } else {
                producto.img64 = null;
            }
        });
        res.status(200).json({ productos: productos });
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para desactivar las entregas de los clientes
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const desactivarEntrega = async (req, res) => {
    const id = req.body.id;

    try {
        const respuesta = await pool.query(`CALL LL_DESACTIVAR_ENTREGA('${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para desactivar las entregas de los clientes
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const desactivarProductoCarrito = async (req, res) => {
    const idProducto = req.body.idProducto;
    const id = req.body.id;
    console.log(idProducto, id);
    try {
        const respuesta = await pool.query(`CALL LL_DESACTIVAR_PRODUCTO_CARRITO('${idProducto}','${id}');`);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Esta funcion sirve para agregar un producto al carrito de compras
 * @param {object} req captura peticiones en HTML
 * @param {object} res envia peticiones en HTML
 */
const agregarProductoCarrito = async (req, res) => {
    const id = req.body.id;
    const producto = req.params['producto']

    try {
        const respuesta = await pool.query(`CALL LL_INSERTAR_PRODUCTO_CARRITO('${id}','${producto}');`);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error);
    }
};

export { agregarProductoCarrito, cancelarUltimaVenta, crearPago, crearReembolso, buscarProductoVendido, desactivarEntrega, desactivarProductoCarrito, historialCompra, reiniciarCarritoCompras, verificarStock, verCarroCompras, verEntregasAdmin, verEntregas, verReservasProductos }