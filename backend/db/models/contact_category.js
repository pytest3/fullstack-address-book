"use strict";
const { contact } = require("./contact.js");
const { category } = require("./category.js");

module.exports = (sequelize, DataTypes) => {
  const contact_category = sequelize.define("contact_category", {
    contact_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: contact, key: "id" },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: category, key: "id" },
    },
  });

  contact_category.associate = (models) => {
    contact_category.belongsToMany(models.category, {
      through: contact_category,
    });
    contact_category.belongsToMany(models.contact, {
      through: contact_category,
    });
  };

  return contact_category;
};

// module.exports = (sequelize, DataTypes) => {
//   class contact_category extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   contact_category.init(
//     {
//       contact_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: { model: contact, key: "id" },
//       },
//       category_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: { model: category, key: "id" },
//       },
//     },
//     {
//       sequelize,
//       modelName: "contact_category",
//     }
//   );
//   return contact_category;
// };
