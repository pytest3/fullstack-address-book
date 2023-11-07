"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("contact_hobby", {
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
        onDelete: "cascade",
      },
      hobby_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "hobby",
          key: "id",
        },
        onDelete: "cascade",
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
    await queryInterface.dropTable("contact_hobby");
  },
};
