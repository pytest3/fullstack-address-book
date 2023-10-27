"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("contact", [
      {
        first_name: "John",
        last_name: "Doe",
        birthday: new Date(),
        email: "example1@example.com",
        marital_status: "married",
      },
      {
        first_name: "mary",
        last_name: "jane",
        birthday: new Date(),
        email: "example2@example.com",
        marital_status: "divorced",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("contact", null, {});
  },
};
