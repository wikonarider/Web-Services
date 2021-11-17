const { Service, conn } = require("../db");

async function validServiceId(userId, serviceId) {
  const service = await Service.findByPk(serviceId);
  if (service) {
    return service.userId !== userId && service.avaliable;
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

// Como usar, pasarle un userId y te devuelve un arreglo
// con todos los ids de los servicios que compro ese usuario
async function allServicesBought(userId) {
  const [services, metadata] = await conn.query(
    ` 
    SELECT array_agg(DISTINCT c) as bought
    FROM   
    (
      SELECT unnest(services)
      FROM orders 
      WHERE orders."userId" = '${userId}'  
      AND
      orders.status = 'success'
    )
    AS dt(c)
    `
  );
  return services[0].bought;
}

module.exports = {
  validServiceId,
  validServicesId,
  allServicesBought,
};
