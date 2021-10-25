const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('users', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userImg : {
            type : DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname : {
            type : DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique : true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull : false, 
            unique : true
        },
        location: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull : false
        }
    });
};
