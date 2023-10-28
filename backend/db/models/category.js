"use strict";

module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "category",
    {
      category_name: { type: DataTypes.STRING, allowNull: false },
    },
    { freezeTableName: true, underscored: true }
  );

  category.associate = (models) => {
    category.belongsToMany(models.contact, {
      through: "contact_category",
    });
  };

  return category;
};

// module.exports = (sequelize, DataTypes) => {
//   class category extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   category.init(
//     {
//       category_name: { type: DataTypes.STRING, allowNull: false },
//     },
//     {
//       sequelize,
//       modelName: "category",
//     }
//   );
//   return category;
// };
