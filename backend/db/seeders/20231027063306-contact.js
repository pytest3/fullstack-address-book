"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("contact", [
      {
        first_name: "John",
        last_name: "Doe",
        birthday: new Date(),
        marital_status: "married",
        is_employed: "employed",
        is_parent: "parent",
      },
      {
        first_name: "mary",
        last_name: "jane",
        birthday: new Date(),
        marital_status: "divorced",
        is_employed: "employed",
        is_parent: "notParent",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("contact", null, {});
  },
};
