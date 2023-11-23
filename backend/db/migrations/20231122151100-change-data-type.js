"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.changeColumn("contact", "is_employed", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("contact", "is_parent", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.changeColumn("contact", "is_employed", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    });
    await queryInterface.changeColumn("contact", "is_parent", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    });
  },
};
