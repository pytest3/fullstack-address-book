"use strict";

module.exports = (sequelize, DataTypes) => {
  const parenthood_detail = sequelize.define(
    "parenthood_detail",
    {
      son_count: { type: DataTypes.INTEGER, allowNull: false },
      daughter_count: { type: DataTypes.INTEGER, allowNull: false },
      contact_id: {
        type: DataTypes.INTEGER,
        // foreignKey: true,
        references: {
          model: "contact",
          key: "id",
        },
        unique: true,
      },
    },
    { freezeTableName: true, underscored: true }
  );

  parenthood_detail.associate = (models) => {
    parenthood_detail.belongsTo(models.contact, {
      foreignKey: "contact_id",
    });
  };

  return parenthood_detail;
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
