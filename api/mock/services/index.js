
const { Service } = require("../../src/db");
const { lessons } = require("./lessons");
const { repair } = require("./repairs");
const { transport } = require("./transport");
const {eventsOrganization} = requite('./eventsOrganization')

const bulk = [...lessons, ...repair, ...transport, ...eventsOrganization];

function loadServices() {
  return Service.bulkCreate(bulk);
}

module.exports = {
  loadServices,
};
