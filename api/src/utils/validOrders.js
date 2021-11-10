const { Service } = require('../db');

async function validServiceId(userId, serviceId) {
  const service = await Service.findByPk(serviceId);
  if (service) {
    return service.userId !== userId;
  }
  return false;
}

async function validServicesId(userId, arrayServices) {
  if (arrayServices) {
    for (let i = 0; i < arrayServices.length; i++) {
      const check = await validServiceId(userId, arrayServices[i]);
      if (!check) {
        return false;
      }
    }
    return true;
  }
  return false;
}

module.exports = {
  validServiceId,
  validServicesId,
};
