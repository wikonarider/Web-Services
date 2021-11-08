const { DataTypes, UUID, UUIDV1 } = require("sequelize");
const { STRING, ARRAY } = DataTypes;
module.exports = (sequelize) => {
  sequelize.define(
    "convertations",
    {
      userA: { type: STRING, alowNull: false },

      userB: {
        type: STRING,
        alowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
