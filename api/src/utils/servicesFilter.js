const { Service} = require("../db.js");
const { Op } = require("sequelize");


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
  console.log('ENTRE FUNCION ORDER')

  return dbServices;
}


async function filterByPriceRange(startRange, endRange) {

  let rangeFilter = await Service.findAll({
    where: {
      price: {
        [Op.between]: [startRange, endRange],
      },
    },
    include: {
      all: true,
    },
    order: [["price", "ASC"]],
  })
  return rangeFilter;
}


async function filterByDate(date) {
  if (date && date === "ASC" ){
  let dateFilter = await Service.findAll({
    include: {
      all: true,
    },
    order: [["created_at", "ASC"]],
  }) }else{
  let dateFilter = await Service.findAll({
    include: {
      all: true,
    },
    order: [["created_at", "DESC"]],
  })} 
  return dateFilter;
}

module.exports = {
  orderByPrice,
  filterByPriceRange,
  filterByDate


};
