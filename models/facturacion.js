const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Facturacion = sequelize.define('Facturacion', {
    rfc: { type: DataTypes.STRING, allowNull: false },
    nombreReceptor: { type: DataTypes.STRING, allowNull: false },
    regimenFiscal: { type: DataTypes.STRING, allowNull: false },
    usoCFDI: { type: DataTypes.STRING, allowNull: false },
    codigoPostal: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    pdfRFC: { type: DataTypes.STRING },
    ticketFoto: { type: DataTypes.STRING },
    realizada: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
}, { timestamps: false });

module.exports = Facturacion;