const { Service } = require("../../src/db");
const { lessons } = require("./lessons");

const bulk = [...lessons];

function loadServices() {
  return Service.bulkCreate(bulk);
}

module.exports = {
  loadServices,
};
