"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("contact_phone_number", [
      {
        phone_number: 98767678,
        contact_id: 1,
      },
      {
        phone_number: 83771377,
        contact_id: 1,
      },
      {
        phone_number: 98776838,
        contact_id: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("contact_phone_number", null, {});
  },
};
