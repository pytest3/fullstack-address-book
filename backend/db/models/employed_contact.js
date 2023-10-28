"use strict";

module.exports = (sequelize, DataTypes) => {
  const parent = sequelize.define(
    "employed_contact",
    {
      company_name: { type: DataTypes.STRING, allowNull: false },
      company_industry: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: false },
      contact_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "contact",
          key: "id",
        },
      },
    },
    { freezeTableName: true, underscored: true }
  );

  parent.associate = (models) => {
    parent.belongsTo(models.contact, { foreignKey: "contact_id" });
  };

  return parent;
};
// module.exports = (sequelize, DataTypes) => {
//   class parent extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   parent.init(
//     {
//       number_of_kids: { type: DataTypes.INTEGER, allowNull: false },
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
//       modelName: "parent",
//     }
//   );
//   return parent;
// };
