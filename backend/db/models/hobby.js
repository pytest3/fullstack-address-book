"use strict";
const { Model } = require("sequelize");
const { contact } = require("./contact");

module.exports = (sequelize, DataTypes) => {
  const hobby = sequelize.define("hobby", {
    hobby_name: { type: DataTypes.STRING, allowNull: false },
  });

  return hobby;
};
