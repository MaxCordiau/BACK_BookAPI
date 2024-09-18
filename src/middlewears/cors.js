const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173', // URL de ton frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;