"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _reservasControllers = require("../controllers/reservas.controllers.js");
var _oauth = require("../middlewares/oauth.js");
var _pdfKit = require("../libs/pdfKit.js");
/**
 * Estas son las rutas del backend de reservas para gestionar las operaciones relacionadas con las reservas
 * @type {object}
 */
var rutaReservaAdmin = (0, _express.Router)();
rutaReservaAdmin.get("/admin", _reservasControllers.listarReservasAdmin);
rutaReservaAdmin.get("/listar/:id", _reservasControllers.listarReservas);
rutaReservaAdmin.get("/historial/:id", _reservasControllers.historialCita);
rutaReservaAdmin.get("/historial/", _reservasControllers.historialReserva);
rutaReservaAdmin.post("/crear", _reservasControllers.crearReserva);
rutaReservaAdmin.post("/cancelar", _reservasControllers.cancelarReserva);
rutaReservaAdmin.get("/pdf", function (req, res) {
  // Configuración de cabeceras de respuesta para el PDF generado
  var stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename = Reservas.pdf"
  });
  // Genera y envía el PDF utilizando la función generarPDF
  (0, _pdfKit.generarPDF)(function (data) {
    return stream.write(data);
  },
  // Función de callback para escribir datos en el stream de respuesta
  function () {
    return stream.end();
  } // Función de callback para finalizar el stream de respuesta
  );
});
// Ruta para generar PDF de reservas de un barbero específico
rutaReservaAdmin.get("/pdf/barbero/:id/:barbero", function (req, res) {
  var id = req.params['id'];
  var barbero = req.params['barbero'];

  // Configura las cabeceras de respuesta para el PDF generado
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=Reservas.pdf");

  // Genera y envía el PDF utilizando la función generarPDFBarbero
  (0, _pdfKit.generarPDFBarbero)({
    id: id,
    barbero: barbero
  },
  // Parámetros para la generación del PDF (en este caso, el ID del barbero)
  function (chunk) {
    return res.write(chunk, 'binary');
  },
  // Función de callback para escribir datos en el stream de respuesta
  function () {
    return res.end();
  } // Función de callback para finalizar el stream de respuesta
  );
});
var _default = exports["default"] = rutaReservaAdmin;