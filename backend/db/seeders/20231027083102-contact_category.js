"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("contact_category", [
      {
        contact_id: 1,
        category_id: 1,
      },
      {
        contact_id: 2,
        category_id: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("contact_category", null, {});
  },
};
