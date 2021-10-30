const { Service, Users, Qualification, Category, Group } = require("../db.js");

const {
  orderByUpdateDate,
  orderByCreatedDate,
  filterByPriceRange,
  orderByQualifications,
  filterByDate,
  orderTitle,
  orderProvince,
  orderByPrice,
} = require("./functionsFilters.js");

//--------------------------------------------------------------------------
const servicesFilters = async function (objQuery, res, next) {
  var dbServices = await Service.findAll({
    //Traigo todo de la db
    include: [
      {
        model: Users,
        through: { attributes: [] },
      },
      Qualification,
      {
        model: Category,
        include: {
          model: Group,
        },
      },
    ],
  });

  if (objQuery.title) {
    orderTitle(dbServices, objQuery.title, res, next);
  }
  if (objQuery.province) {
    orderProvince(objQuery.province, res, next);
  }
  if (objQuery.category) {
    orderCategory(dbServices, objQuery, res, next);
  }
};

//------------------------------------------------------------------------------------------------------functiones que ordenan y filtran
function orderCategory(dbServices, objQuery, res, next) {
  switch (objQuery.category) {
    case "price": {
      orderByPrice(dbServices, objQuery, res, next);
      break;
    }
    case "created": {
      orderByCreatedDate(objQuery, res, next);
      break;
    }
    case "updated": {
      orderByUpdateDate(objQuery, res, next);
      break;
    }
    case "qualifications": {
      orderByQualifications(objQuery, res, next);
      break;
    }
  }
}

module.exports = servicesFilters;
