'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Reservaciones', 'realizada', {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Reservaciones', 'realizada');
  }
};