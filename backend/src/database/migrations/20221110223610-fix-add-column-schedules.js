'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Schedules', 'createdBy', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Schedules', 'createdBy')
  }
};
