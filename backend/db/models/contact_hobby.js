"use strict";

module.exports = (sequelize, DataTypes) => {
  const contact_hobby = sequelize.define(
    "contact_hobby",
    {
      contact_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "contact", key: "id" },
      },
      hobby_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "hobby", key: "id" },
      },
    },
    { freezeTableName: true, underscored: true }
  );

  return contact_hobby;
};

// module.exports = (sequelize, DataTypes) => {
//   class contact_hobby extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   contact_hobby.init(
//     {
//       contact_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: { model: contact, key: "id" },
//       },
//       hobby_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: { model: hobby, key: "id" },
//       },
//     },
//     {
//       sequelize,
//       modelName: "contact_hobby",
//     }
//   );
//   return contact_hobby;
// };
