const { DataTypes, UUID, UUIDV1 } = require("sequelize");
const { STRING } = DataTypes;
module.exports = (sequelize) => {
  sequelize.define(
    "chat",
    {
      remit: {
        type: STRING,
        alowNull: false,
      },

      text: {
        type: STRING,
        alowNull: false,
      }
    },
    {
      timestamps: true,
    }
  );
};
