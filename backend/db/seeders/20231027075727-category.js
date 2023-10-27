"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("category", [
      {
        category_name: "Friends",
      },
      {
        category_name: "Colleagues",
      },
      {
        category_name: "Family",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("category", null, {});
  },
};
