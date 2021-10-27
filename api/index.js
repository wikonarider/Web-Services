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
const { Service, Users, Group } = require("./src/db");
const { ENV_VARIABLE } = process.env;

conn.sync({ force: Boolean(Number(ENV_VARIABLE)) }).then(() => {
  server.listen(3001, () => {
    Service.bulkCreate(json).then(() => console.log("Servicios Cargados"));
    Users.bulkCreate(users, { individualHooks: true }).then(() =>
      console.log("Users Cargados")
    );
    Group.bulkCreate(groups)
      .then(() => {
        console.log("Grupos cargados");
        Promise.resolve(linkAllGroups()).then(() =>
          console.log("Categorias cargadas")
        );
      })
      .catch((e) => console.log(e));

    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
