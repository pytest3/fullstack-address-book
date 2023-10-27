"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const contact_phone_number = sequelize.define(
    "contact_phone_number",
    {
      phone_number: { type: DataTypes.STRING, allowNull: false },
      contact_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "contact",
          key: "id",
        },
      },
    },
    { freezeTableName: true }
  );

  const { contact } = sequelize.models;
  contact_phone_number.belongsTo(contact);

  return contact_phone_number;
};

// module.exports = (sequelize, DataTypes) => {
//   class contact_phone_number extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   contact_phone_number.init(
//     {
//       phone_number: { type: DataTypes.STRING, allowNull: false },
//       contact_id: {
//         type: DataTypes.INTEGER,
//         references: {
//           model: contact, // 'Movies' would also work
//           key: "id",
//         },
//       },
//     },
//     {
//       sequelize,
//       modelName: "contact_phone_number",
//     }
//   );
//   return contact_phone_number;
// };
