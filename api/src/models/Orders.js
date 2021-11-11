const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('orders', {
    status: {
      type: DataTypes.STRING,
      alowNull: false,
    },
    services: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    total: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  });
};
