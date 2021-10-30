const { Service } = require("../db.js");
const { Op } = require("sequelize");
//------------------------------------------------------------------------------------------price
function orderByPrice(services, objQuery, res, next) {
  const { order } = objQuery;
  var dbServices = services;
  order === "ASC"
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
  return res.status(200).send(dbServices);
}
//--------------------------------------------------------------------------------------price range
async function filterByPriceRange(objQuery, res, next) {
  const { startRange, endRange } = objQuery;
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
  });
  res.status(200).send(rangeFilter);
}
//-------------------------------------------------------------------------------------------date create
async function orderByCreatedDate(objQuery, res, next) {
  const { order } = objQuery;

  if (order === "ASC") {
    let dateFilter = await Service.findAll({
      include: {
        all: true,
      },
      order: [["created_at", "ASC"]],
    });
  } else {
    let dateFilter = await Service.findAll({
      include: {
        all: true,
      },
      order: [["created_at", "DESC"]],
    });
  }
  res.status(200).send(dateFilter);
}
//-------------------------------------------------------------------------------------------------date update
async function orderByUpdateDate(objQuery, res, next) {
  const { order } = objQuery;
  if (order === "ASC") {
    let dateFilter = await Service.findAll({
      include: {
        all: true,
      },
      order: [["updated_at", "ASC"]],
    });
  } else {
    let dateFilter = await Service.findAll({
      include: {
        all: true,
      },
      order: [["updated_at", "DESC"]],
    });
  }
  res.status(200).send(dateFilter);
}

//--------------------------------------------------------------------------------------------------title
function orderTitle(dbServices, title, res, next) {
  var filteredServices = [];
  dbServices.map((service) => {
    if (service.title.toLowerCase().includes(title.toLowerCase()))
      filteredServices.push(service);
  });
  return res.send(filteredServices); //Si coincide mando el servicio con ese title
}

//-------------------------------------------------------------------------------------------------------
function orderByQualifications(province, res, next) {}
//-------------------------------------------------------------------------------------------------------
function orderProvince(objQuery, res, next) {}
//-------------------------------------------------------------------------------------------------------
//function orderProvince(objQuery, res, next) {}
//-------------------------------------------------------------------------------------------------------
//function orderProvince(objQuery, res, next) {}
//-------------------------------------------------------------------------------------------------------
//function orderProvince(objQuery, res, next) {}
//-------------------------------------------------------------------------------------------------------

module.exports = {
  orderByQualifications,
  orderByCreatedDate,
  filterByPriceRange,
  orderByUpdateDate,
  orderByPrice,
  orderTitle,
  orderProvince,
};
