"use strict";
const { Model } = require("sequelize");
const { contact } = require("./contact");

module.exports = (sequelize, DataTypes) => {
  const hobby = sequelize.define("hobby", {
    hobby_name: { type: DataTypes.STRING, allowNull: false },
    contact_id: {
      type: DataTypes.INTEGER,
      references: {
        model: contact, // 'Movies' would also work
        key: "id",
      },
    },
  });

  return hobby;
};
