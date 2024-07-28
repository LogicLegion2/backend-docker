"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verificarToken = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _dotenv = require("dotenv");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _mysqlDb = require("../config/mysql.db.js");
(0, _dotenv.config)();
var error = function error(req, res, statusCode, message) {
  res.status(statusCode).json({
    error: message
  });
};
var verificarToken = exports.verificarToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, decoded;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          token = req.headers["x-access-token"];
          if (token) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", error(req, res, 401, "No se ha proporcionado un token"));
        case 3:
          try {
            // const invalidToken = await pool.query(`CALL LL_VER_TOKEN('${token}')`);
            // if (invalidToken && invalidToken[0].length > 0) {
            //     return error(req, res, 401, "Token invalido");
            // }
            decoded = _jsonwebtoken["default"].verify(token, process.env.TOKEN_PRIVATEKEY); // req.idUsuario = decoded.idUsuario; 
            next();
          } catch (err) {
            if (err.name === 'TokenExpiredError') {
              error(req, res, 401, "Token expirado");
            } else if (err.name === 'JsonWebTokenError') {
              error(req, res, 401, "Token invalido");
            } else {
              error(req, res, 500, "Ha fallado el proceso de autenticación");
            }
          }
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function verificarToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();