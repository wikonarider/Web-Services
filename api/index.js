//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { server, port } = require("./src/app.js");
const { conn } = require("./src/db.js");
const { loadServices } = require("./mock/services/index");
const { linkAllGroups } = require("./mock/categories");
const { groups } = require("./mock/groups");
const { users } = require("./mock/usersJson");
const { comments } = require("./mock/qualifications");
const { purchases } = require("./mock/purchases");
const {
  Users,
  Group,
  Province,
  City,
  Qualification,
  Orders,
} = require("./src/db");
const { loadProvinces } = require("./mock/provinces");
const { loadCities } = require("./mock/cities");
const { ENV_VARIABLE } = process.env;

conn.sync({ force: Boolean(Number(ENV_VARIABLE)) }).then(() => {
  server.listen(port, async () => {
    try {
      var flat = Boolean(Number(ENV_VARIABLE));
      if (!flat) {
        console.log(`Force ${flat}, datos no cargados`);
      } else {
        await Group.bulkCreate(groups).then(() => {
          console.log(`-Force ${flat}-\nGrupos cargados`);
          Promise.resolve(linkAllGroups()).then(() =>
            console.log("Categorias cargadas")
          );
        });

        await Users.bulkCreate(users, { individualHooks: true }).then(() =>
          console.log("Users Cargados")
        );
        await loadProvinces()
          .then((data) => Province.bulkCreate(data))
          .then(() => console.log("Provincias Cargadas"));

        await loadCities()
          .then((data) => City.bulkCreate(data))
          .then(() => console.log("Ciudades Cargadas"));

        await loadServices().then(() => console.log("Servicios Cargados"));

        await Qualification.bulkCreate(comments).then(() => {
          console.log(`Comentarios cargados`);
        });

        await Orders.bulkCreate(purchases).then(() => {
          console.log(`Compras cargadas`);
        });
      }
      console.log(`--------listening on port ${port}---------`); // eslint-disable-line no-console
    } catch (e) {
      console.log(e);
    }
  });
});
