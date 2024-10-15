module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('reservaciones', {
          id: {
              type: Sequelize.INTEGER,
              autoIncrement: true,
              primaryKey: true,
              allowNull: false
          },
          nombre: {
              type: Sequelize.STRING,
              allowNull: false
          },
          email: {
              type: Sequelize.STRING,
              allowNull: true
          },
          telefono: {
              type: Sequelize.STRING,
              allowNull: false
          },
          fecha: {
              type: Sequelize.DATEONLY,
              allowNull: false
          },
          hora: {
              type: Sequelize.TIME,
              allowNull: false
          },
          personas: {
              type: Sequelize.INTEGER,
              allowNull: false
          }
      });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('reservaciones');
  }
};