const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "services_users_bought",
    {},
    { tableName: "services_users_bought" }
  );
  //     id: {
  //         type: DataTypes.INTEGER,
  //         primaryKey: true,
  //         autoIncrement: true,
  //         unique: true,
  //       },
  //       favourite:{
  //           type: DataTypes.BOOLEAN,
  //           allowNull: true,
  //           defaultValue: false,
  //         }
  //   });
};
