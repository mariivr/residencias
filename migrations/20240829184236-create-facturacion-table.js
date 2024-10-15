module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Facturaciones', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      rfc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nombreReceptor: { // Cambiado para coincidir con el modelo
        type: Sequelize.STRING,
        allowNull: false,
      },
      regimenFiscal: { // Cambiado para coincidir con el modelo
        type: Sequelize.STRING,
        allowNull: false,
      },
      usoCFDI: { // Cambiado para coincidir con el modelo
        type: Sequelize.STRING,
        allowNull: false,
      },
      codigoPostal: { // Cambiado para coincidir con el modelo
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pdfRFC: { // Cambiado para coincidir con el modelo
        type: Sequelize.STRING,
        allowNull: true, // O false si no se permiten valores nulos
      },
      ticketFoto: { // Cambiado para coincidir con el modelo
        type: Sequelize.STRING,
        allowNull: true, // O false si no se permiten valores nulos
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Facturaciones');
  },
};
