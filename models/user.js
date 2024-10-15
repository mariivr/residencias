const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que el archivo database.js exporte una instancia de Sequelize

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: DataTypes.ENUM('admin', 'gerente', 'empleado'),
        allowNull: false,
    }
}, {
    tableName: 'users', // Asegúrate de que tu tabla en la base de datos se llame 'users'
    timestamps: false, // Si no estás usando timestamps, de lo contrario pon true y ajusta los campos de createdAt y updatedAt
});

module.exports = User;
