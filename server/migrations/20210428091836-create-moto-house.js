'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MotoHouses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      motoStore: {
        type: Sequelize.STRING
      },
      cc: {
        type: Sequelize.STRING
      },
      motoCatalog: {
        type: Sequelize.STRING
      },
      numbers: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      OrderId: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MotoHouses');
  }
};