"use strict";

module.exports = (sequelize, DataTypes) => {
  const contact = sequelize.define(
    "contact",
    {
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
      marital_status: {
        type: DataTypes.STRING,
        validate: {
          isIn: [["married", "single", "divorced", "not applicable"]],
        },
      },
      is_parent: { type: DataTypes.STRING, allowNull: false },
      is_employed: { type: DataTypes.STRING, allowNull: false },
    },
    { freezeTableName: true, underscored: true, onDelete: "cascade" }
  );

  contact.associate = (models) => {
    contact.hasMany(models.email);
    contact.hasMany(models.contact_phone_number);
    contact.hasOne(models.parenthood_detail, {
      foreignKey: "contact_id",
    });
    contact.hasOne(models.employment_detail, {
      foreignKey: "contact_id",
    });
    contact.belongsToMany(models.category, {
      through: "contact_category",
      sourceKey: "id",
      targetKey: "id",
    });
    contact.belongsToMany(models.hobby, {
      through: "contact_hobby",
      sourceKey: "id",
      targetKey: "id",
    });
  };

  return contact;
};
