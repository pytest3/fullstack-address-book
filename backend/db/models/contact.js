"use strict";

module.exports = (sequelize, DataTypes) => {
  const contact = sequelize.define("contact", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    birthday: { type: DataTypes.DATE, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    marital_status: {
      type: DataTypes.STRING,
      validate: { isIn: [["married", "single", "divorced", "separated"]] },
    },
  });

  contact.associate = (models) => {
    contact.hasMany(models.email);
    contact.hasMany(models.contact_phone_number);
    contact.hasOne(models.parent, {
      foreignKey: "contact_id",
    });
    contact.hasOne(models.employed_contact, {
      foreignKey: "contact_id",
    });
  };

  return contact;
};
