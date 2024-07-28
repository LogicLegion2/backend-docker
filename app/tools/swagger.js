import swaggerAutogen from 'swagger-autogen';
import { config } from 'dotenv';
config();

let port = process.env.PORT || 3000;

const doc = {
  info: {
    title: 'API Barbería',
    description: 'Gestión de citas'
  },
  host: 'localhost:' + port + '/'
};

const outputFile = './app/tools/swagger-output.json';
const routes = [
    '../routes/barbero.routes.js',
    '../routes/comentarios.routes.js',
    '../routes/favoritos.routes.js',
    '../routes/ofertas.routes.js',
    '../routes/preguntas.routes.js',
    '../routes/productos.routes.js',
    '../routes/reservas.routes.js',
    '../routes/servicios.routes.js',
    '../routes/ubicaciones.routes.js',
    '../routes/usuarios.routes.js',
    '../routes/ventas.routes.js'
];

swaggerAutogen()(outputFile, routes, doc);
