"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("hobby", [
      {
        hobby_name: "golf",
      },
      {
        hobby_name: "dancing",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("hobby", null, {});
  },
};
