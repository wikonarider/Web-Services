const {
  orderByUpdateDate,
  orderByCreatedDate,
  filterByPriceRange,
  orderByQualifications,
  filterByDate,
  orderTitle,
  orderByProvince,
  orderByPrice,
} = require("./functionsFilters.js");
const {
  Service,
  Users,
  Qualification,
  Category,
  Group,
  conn,
  Services_users_favourites,
  Services_provinces,
  Services_cities,
} = require("../db.js");


//--------------------------------------------------------------------------
const servicesFilters = function (objQuery, res, next) {
  console.log("llego");
  if (objQuery) {
    orderCategory(objQuery, res, next);
  }
};

//--------------------------------------------------------------------------------------------------routea functiones que ordenan y filtran
//los nombres de cada case deben ser exactamente como las props de cada model para facilitar desde el front los filtros!!!!!

async function orderCategory(objQuery, res, next) {
  switch (objQuery.filter) {
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

    case "title": {
      orderTitle(objQuery, res, next);
      break;
    }
  }
}

module.exports = servicesFilters;
