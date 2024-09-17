const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Author = sequelize.define('author', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthyear: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Author;
