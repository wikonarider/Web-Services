const { Service } = require("../../src/db");
const { lessons } = require("./lessons");
const { repair } = require("./repairs");
const { transport } = require("./transport");
const { eventsOrganization } = require("./eventsOrganization");
const { houseServices } = require("./houseServices");
const { touring } = require("./touring");


const bulk = [
  ...lessons,
  ...repair,
  ...transport,
  ...eventsOrganization,
  ...houseServices,
  ...touring,
];

function loadServices() {
  return Service.bulkCreate(bulk, { individualHooks: true });
}

module.exports = {
  loadServices,
};
