"use strict";

module.exports = (sequelize, DataTypes) => {
  const employment_detail = sequelize.define(
    "employment_detail",
    {
      company_name: { type: DataTypes.STRING, allowNull: true },
      company_industry: { type: DataTypes.STRING, allowNull: true },
      role: { type: DataTypes.STRING, allowNull: true },
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

  employment_detail.associate = (models) => {
    employment_detail.belongsTo(models.contact, { foreignKey: "contact_id" });
  };

  return employment_detail;
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
