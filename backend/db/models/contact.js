"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  contact.init(
    {
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      birthday: { type: DataTypes.DATE, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      marital_status: {
        type: DataTypes.STRING,
        validate: { isIn: [["married", "single", "divorced", "separated"]] },
      },
    },
    {
      sequelize,
      modelName: "contact",
    }
  );
  return contact;
};
