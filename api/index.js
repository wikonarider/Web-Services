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
const { services } = require('./servicesJson');
const { json } = require('./dbJson');
const { Service, Category } = require('./src/db');

// Syncing all the models at once.

conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    Service.bulkCreate(json).then(() => console.log('Datos Cargados'));
    Category.bulkCreate(services).then(() => console.log('Servicios Cargados'));
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
