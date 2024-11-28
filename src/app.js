require('dotenv').config()
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Middleware para el registro de solicitudes HTTP
const logger = require('./middleware/logger.middleware.js'); // Middleware personalizado para registrar solicitudes en Redis
const { mongoose, redisClient } = require('./database/mongo.database.js'); // Importamos lasconfiguraciones de MongoDB y Redis

const grupoRouter = require('./routes/grupo.routes.js')
const app = express();

// Middleware Connections
app.use(cors())
app.use(express.json())
// Middleware para registrar solicitudes HTTP
app.use(morgan('dev'));
// Middleware personalizado para registrar solicitudes en Redis
app.use(logger);

// Routes
app.use('/grupo', grupoRouter);

// Connection
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('App running in port: ' + PORT)
})


