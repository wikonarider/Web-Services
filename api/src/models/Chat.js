const { DataTypes, UUID, UUIDV1, TEXT, BOOLEAN } = require("sequelize");
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
        type: TEXT,
        alowNull: false,
      },
    
    },
    {
      timestamps: true,
    }
  );
};
