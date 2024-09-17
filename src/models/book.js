// models/book.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    publishedYear: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    authorId: {  // Ajout de la clé étrangère
        type: DataTypes.INTEGER,
        references: {
            model: 'authors',  // Nom de la table associée
            key: 'id'
        }
    }
});

module.exports = Book;
