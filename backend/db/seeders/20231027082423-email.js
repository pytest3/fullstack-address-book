"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("email", [
      {
        email_address: "boy1@gmail.com",
        contact_id: 1,
      },
      {
        email_address: "boy2@gmail.com",
        contact_id: 1,
      },
      {
        email_address: "girl1@gmail.com",
        contact_id: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("email", null, {});
  },
};
