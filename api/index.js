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
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { json } = require("./mock/dbJson");
const { linkAllGroups } = require("./mock/categories");
const { groups } = require("./mock/groups");
const { users } = require("./mock/usersJson");
const { Service, Users, Group, Province, City } = require("./src/db");
const { loadProvinces } = require("./mock/provinces");
const { loadCities } = require("./mock/cities");
const { ENV_VARIABLE } = process.env;

conn.sync({ force: Boolean(Number(ENV_VARIABLE)) }).then(() => {
  server.listen(3001, async () => {
    try {
      if (!Boolean(Number(ENV_VARIABLE))) {
        console.log("Force desactivado, datos no cargados");
      } else {
        await Group.bulkCreate(groups).then(() => {
          console.log("Grupos cargados");
          Promise.resolve(linkAllGroups()).then(() =>
            console.log("Categorias cargadas")
          );
        });

        await Users.bulkCreate(users, { individualHooks: true }).then(() =>
          console.log("Users Cargados")
        );

        await Service.bulkCreate(json).then(() =>
          console.log("Servicios Cargados")
        );
        await loadProvinces()
          .then((data) => Province.bulkCreate(data))
          .then(() => console.log("Provincias Cargadas"));

        await loadCities()
          .then((data) => City.bulkCreate(data))
          .then(() => console.log("Ciudades Cargadas"));
      }
      console.log("----listening on port 3001-----"); // eslint-disable-line no-console
    } catch (e) {
      console.log(e);
    }
  });
});
