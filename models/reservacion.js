const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu configuración

const Reservacion = sequelize.define('Reservacion', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    personas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    realizada: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'reservaciones',
    timestamps: false
});

module.exports = Reservacion;
