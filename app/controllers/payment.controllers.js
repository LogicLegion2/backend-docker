/**
 * Este es el controlador de payment
 * @module ctr-payment
 */

import { application } from "express";
import { HOST, PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET } from "../config/enviroment/config";
import axios from "axios";

const urlFrontend = process.env.FRONTEND_URL;
/**
 * Crea una nueva orden de compra con la API de PayPal
 * @param {object} req - Objeto de solicitud HTTP, que contiene la información de la petición.
 * @param {object} res - Objeto de respuesta HTTP, que se utiliza para enviar una respuesta al cliente.
 */
const createOrder = async (req, res) => {
    const { totalGlobal } = req.body;
    
    const order = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: totalGlobal
                }
            },
        ],
        application_context: {
            brand_name: "Barber's Brothers",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: `${HOST}/capture-order`,
            cancel_url: `${HOST}/cancel-order`,
        }
    };

    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')

    const { data: { access_token } } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
        auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET
        }
    });

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
    
    return res.json(response.data);
};

/**
 * Captura una nueva orden de compra con la API de PayPal
 * @param {object} req - Objeto de solicitud HTTP, que contiene la información de la petición.
 * @param {object} res - Objeto de respuesta HTTP, que se utiliza para enviar una respuesta al cliente.
 */

const captureOrder = async (req, res) => {
    const { token } = req.query;

    const response = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
        {}, {
            auth: {
                username: PAYPAL_API_CLIENT,
                password: PAYPAL_API_SECRET
            }
        }
    );

    return res.redirect(`${urlFrontend}/cliente/carrito?status=success`)
};

/**
 * Cancela una nueva orden de compra con la API de PayPal
 * @param {object} req - Objeto de solicitud HTTP, que contiene la información de la petición.
 * @param {object} res - Objeto de respuesta HTTP, que se utiliza para enviar una respuesta al cliente.
 */
const cancelOrder = (req, res) => res.redirect(`${urlFrontend}/cliente/comprar?status=error`)


export { createOrder, captureOrder, cancelOrder }