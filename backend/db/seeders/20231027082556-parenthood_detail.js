"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("parenthood_detail", [
      {
        contact_id: 1,
        son_count: 1,
        daughter_count: 0,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("parenthood_detail", null, {});
  },
};
