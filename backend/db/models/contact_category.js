"use strict";

module.exports = (sequelize, DataTypes) => {
  const contact_category = sequelize.define(
    "contact_category",
    {
      contact_id: {
        type: DataTypes.INTEGER,
        // allowNull: true,
        references: { model: "contact", key: "id" },
      },
      category_id: {
        type: DataTypes.INTEGER,
        // allowNull: true,
        references: { model: "category", key: "id" },
      },
    },
    { freezeTableName: true, underscored: true }
  );

  contact_category.associate = (models) => {
    contact_category.belongsTo(models.category, { foreignKey: "category_id" });
    contact_category.belongsTo(models.contact, { foreignKey: "contact_id" });
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
