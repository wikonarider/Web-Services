const { Service } = require('../db');

async function validServiceId(userId, serviceId) {
  const service = await Service.findByPk(serviceId);
  if (service) {
    return service.userId !== userId;
  }
  return false;
}

module.exports = {
  validServiceId,
};
