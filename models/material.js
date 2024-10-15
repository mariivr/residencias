const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Material = sequelize.define('Material', {
    material: {
        type: DataTypes.STRING, allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER, allowNull: false
    }
    }, {
        tableName: 'materiales' // Asegúrate de que el nombre de la tabla sea correcto
    });
    
    module.exports = Material;