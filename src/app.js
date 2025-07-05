const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//exportar las rutas





const app = express();

//Middlewares globales
app.use(cors());                // Permite peticiones desde otros dominios (como tu app móvil)
app.use(express.json());        
app.use(morgan('dev'));         // Muestra logs de las peticiones en consola

//Rutas base
app.use('/api/auth', require('./routes/auth.routes'));






//Ruta de prueba para mantener despierto el servidor
app.get('/ping', (req, res) => res.send('pong'));

module.exports = app;