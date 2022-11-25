'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable('teams', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    team_name: {
      type: Sequelize.STRING,
      allowNull: false,
    }
   })
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('teams');
  }
};
