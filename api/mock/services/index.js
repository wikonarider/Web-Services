const { Service } = require('../../src/db');
const { lessons } = require('./lessons');
const { repair } = require('./repairs');

const bulk = [...lessons, ...repair];

function loadServices() {
  return Service.bulkCreate(bulk);
}

module.exports = {
  loadServices,
};
