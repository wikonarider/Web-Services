const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "city",
    {
      name: {
        type: DataTypes.STRING,
        alowNull: false,
      },
      lat: {
        type: DataTypes.FLOAT,
      },
      lon: {
        type: DataTypes.FLOAT,
      },
    },
    {
      timestamps: false,
    }
  );
};
