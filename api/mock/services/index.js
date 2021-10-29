const { Service } = require('../../src/db');
const { lessons } = require('./lessons');
const { repair } = require('./repairs');
const {eventsOrganization} = requite('./eventsOrganization')

const bulk = [...lessons, ...repair, ...eventsOrganization];

function loadServices() {
  return Service.bulkCreate(bulk);
}

module.exports = {
  loadServices,
};
