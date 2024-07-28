"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generarPDF = generarPDF;
exports.generarPDFBarbero = generarPDFBarbero;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _pdfkitTable = _interopRequireDefault(require("pdfkit-table"));
var _mysqlDb = require("../config/mysql.db.js");
var _dotenv = require("dotenv");
var _dayjs = _interopRequireDefault(require("dayjs"));
require("dayjs/locale/es.js");
var _promise = _interopRequireDefault(require("mysql2/promise"));
(0, _dotenv.config)();
_dayjs["default"].locale('es');
function generarPDF(_x, _x2) {
  return _generarPDF.apply(this, arguments);
}
function _generarPDF() {
  _generarPDF = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(dataLlamada, endLlamada) {
    var _yield$pool$query, _yield$pool$query2, rows, reservas, doc, tableArray;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _mysqlDb.pool.query("CALL LL_VER_RESERVA_ADMIN_PDF()");
        case 3:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          rows = _yield$pool$query2[0];
          // Darle formato diferente a la fecha y hora
          reservas = rows[0].map(function (reserva) {
            var fecha = new Date(reserva.fecha).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            });
            var hora = reserva.hora ? reserva.hora.substring(0, 8) : '';
            return [reserva.ubicacion, fecha, hora, reserva.cliente, reserva.barbero];
          }); // Crea documento PDF
          doc = new _pdfkitTable["default"]();
          doc.on("data", dataLlamada);
          doc.on("end", endLlamada);

          // Define el encabezado de la tabla
          tableArray = {
            headers: ["Ubicación", "Fecha", "Hora", "Cliente", "Barbero"],
            rows: reservas
          }; // Título del documento
          doc.fontSize(30).text('Reservas Clientes', {
            align: 'center'
          });
          doc.moveDown();
          // Agrega tabla al documento
          doc.table(tableArray, {
            columnsSize: [130, 60, 60, 110, 110]
          });

          // Finaliza el doc
          doc.end();
          _context.next = 21;
          break;
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          endLlamada(_context.t0);
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 17]]);
  }));
  return _generarPDF.apply(this, arguments);
}
function generarPDFBarbero(_x3, _x4, _x5) {
  return _generarPDFBarbero.apply(this, arguments);
}
function _generarPDFBarbero() {
  _generarPDFBarbero = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(params, dataLlamada, endLlamada) {
    var id, barbero, _yield$pool$query3, _yield$pool$query4, rows, reservas, doc, tableArray;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = params['id'];
          barbero = params['barbero'];
          _context2.prev = 2;
          _context2.next = 5;
          return _mysqlDb.pool.query("CALL LL_VER_RESERVA_BARBERO(".concat(id, ")"));
        case 5:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          // Darle formato diferente a la fecha y hora
          reservas = rows[0].map(function (reserva) {
            var fecha = new Date(reserva.fecha).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            });
            var hora = reserva.hora ? reserva.hora.substring(0, 8) : '';
            return [reserva.ubicacion, fecha, hora, reserva.cliente];
          }); // Crea documento PDF
          doc = new _pdfkitTable["default"]();
          doc.on("data", dataLlamada);
          doc.on("end", endLlamada);

          // Define el encabezado y contenido de la tabla
          tableArray = {
            headers: ["Ubicación", "Fecha", "Hora", "Cliente"],
            rows: reservas
          }; // Título del documento
          doc.fontSize(30).text('Reservas Clientes', {
            align: 'center'
          });
          doc.moveDown();
          // Agrega tabla al documento
          doc.table(tableArray, {
            columnsSize: [155, 90, 90, 155]
          });
          // Agrega el nombre del barbero al documento
          doc.moveDown();
          doc.fontSize(13).text("Barbero: ".concat(barbero));
          // Finaliza el doc
          doc.end();
          _context2.next = 24;
          break;
        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](2);
          console.error(_context2.t0);
        case 24:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2, 21]]);
  }));
  return _generarPDFBarbero.apply(this, arguments);
}