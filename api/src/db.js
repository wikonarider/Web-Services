require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const bcrypt = require("bcrypt");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Service, Users, Qualification, Category, Group, Province, City } =
  sequelize.models;
// console.log("SEQUELIZE MODEL", sequelize.models);
// Aca vendrian las relaciones
Service.belongsToMany(Users, { through: "services_users_bought" });
Users.belongsToMany(Service, { through: "services_users_bought" });

Service.belongsToMany(Users, { through: "services_users_favourites" });
Users.belongsToMany(Service, { through: "services_users_favourites" });

Users.hasMany(Service);
Service.belongsTo(Users);

Category.hasMany(Service);
Service.belongsTo(Category);

Service.hasMany(Qualification);
Qualification.belongsTo(Service);

Users.hasMany(Qualification);
Qualification.belongsTo(Users);

Group.hasMany(Category);
Category.belongsTo(Group);

Category.hasMany(Service);
Service.belongsTo(Category);

// Province -> n Cities
// City -> 1 Province
Province.hasMany(City);
City.belongsTo(Province);

// Service -> n provinces
// Provinces -> m services
Service.belongsToMany(Province, { through: "services_provinces" });
Province.belongsToMany(Service, { through: "services_provinces" });

// Service -> n cities
// City -> m services
Service.belongsToMany(City, { through: "services_cities" });
City.belongsToMany(Service, { through: "services_cities" });
// Product.hasMany(Reviews);

// hooks users
// Encripta la contraseña antes de crear el usuario
Users.beforeCreate(async function (user) {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// Encripta la contraseña cuando el usuario la cambia
Users.beforeUpdate(async function (user) {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// Funcion que se va a usar en el logeo, para verificar que sea la contraseña
Users.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
