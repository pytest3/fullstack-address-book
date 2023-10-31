"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("parenthood_details", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contact_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
          model: "contact",
          key: "id",
        },
        // foreignKey: true,
        unique: true,
      },
      son_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      daughter_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("parenthood_details");
  },
};
