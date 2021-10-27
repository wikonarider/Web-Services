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
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { json } = require('./mock/dbJson');
const { services } = require('./mock/servicesJson');
const { users } = require('./mock/usersJson');
const { Service, Category, Users } = require('./src/db');
const { ENV_VARIABLE } = process.env;

conn.sync({ force: Boolean(Number(ENV_VARIABLE)) }).then(() => {
  server.listen(3001, () => {
    Service.bulkCreate(json).then(() => console.log('Datos Cargados'));
    Category.bulkCreate(services).then(() => console.log('Servicios Cargados'));
    Users.bulkCreate(users).then(() => console.log('Users Cargados'));
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
