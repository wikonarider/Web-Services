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
const servicesFilters = function (objQuery, res, next) {
  if (objQuery.title) {
    orderTitle(objQuery.title, res, next);
  }
  if (objQuery.province) {
    orderProvince(objQuery.province, res, next);
  }
  if (objQuery.category) {
    orderCategory(objQuery, res, next);
  }
};

//--------------------------------------------------------------------------------------------------routea functiones que ordenan y filtran
function orderCategory(objQuery, res, next) {
  switch (objQuery.category) {
    case "price": {
      orderByPrice(objQuery, res, next);
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
