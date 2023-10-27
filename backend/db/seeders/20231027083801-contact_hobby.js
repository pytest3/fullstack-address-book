"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("contact_hobby", [
      {
        contact_id: 1,
        hobby_id: 1,
      },
      {
        contact_id: 2,
        hobby_id: 1,
      },
      {
        contact_id: 2,
        hobby_id: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("contact_hobby", null, {});
  },
};
