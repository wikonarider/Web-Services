const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('services', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img : {
      type : DataTypes.STRING,
      allowNull: false
    },
    description: {
      type : DataTypes.TEXT,
      allowNull: false
    },
    price : {
      type : DataTypes.FLOAT
    }
  });
};
