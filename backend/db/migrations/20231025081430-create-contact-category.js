"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "contact_category",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        contact_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "contact",
            key: "id",
          },
        },
        category_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "category",
            key: "id",
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      { logging: console.log }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("contact_category");
  },
};
