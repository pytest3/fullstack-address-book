"use strict";

module.exports = (sequelize, DataTypes) => {
  const hobby = sequelize.define(
    "hobby",
    {
      hobby_name: { type: DataTypes.STRING, allowNull: false },
    },
    { freezeTableName: true }
  );

  hobby.associate = (models) => {
    hobby.belongsToMany(models.contact, {
      through: "contact_hobby",
      foreignKey: "hobby_id",
    });
  };

  return hobby;
};
