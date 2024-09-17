// Imports
const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewears/errorHandler');
const sequelize = require('./config/database');
const cors = require('cors');


// Configuration
const app = express();
app.use(express.json());

// cors : 
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);


// Middleware
app.use(errorHandler);

// TEST
app.get('/', (req, res) => {
    res.send("Hello World!");
});

// Serveur
const PORT = process.env.PORT || 3000;

// Synchronisation de la base de données
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});