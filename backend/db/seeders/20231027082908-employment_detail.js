"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("employment_detail", [
      {
        company_name: "Nike",
        company_industry: "Sports",
        role: "analyst",
        contact_id: 1,
      },
      {
        company_name: "Tesla",
        company_industry: "Tech",
        role: "developer",
        contact_id: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("employment_detail", null, {});
  },
};
