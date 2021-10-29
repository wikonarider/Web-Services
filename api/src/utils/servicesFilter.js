async function orderByPrice(order, dbServices) {
  order && order === "ASC"
    ? (dbServices = dbServices.sort(function (a, b) {
        if (a.price > b.price) {
          return -1;
        }
        if (b.price > a.price) {
          return 1;
        }
        return 0;
      }))
    : (dbServices = dbServices.sort(function (a, b) {
        if (b.price > a.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      }));
  return dbServices;
}

module.exports = {
  orderByPrice,
};
