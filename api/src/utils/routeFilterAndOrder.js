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
const { addRating } = require("../utils/index");


//--------------------------------------------------------------------------
const servicesFilters = function (objQuery, res, next) {
  console.log("llego")
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

    case "title":
      { const { name} = objQuery;
      dbServices = await Service.findAll({
        //Traigo todo de la db
        attributes: ["id", "title", "img", "description", "price", "userId"],
  
        // include: { all: true },
        include: [
          {
            model: Category,
            attributes: ["name"],
            include: {
              model: Group,
              attributes: ["name"],
            },
          },
        ],
      });
  
      dbServices = await addRating(dbServices);
        if (dbServices.length > 0) {
          if (name) {
            //si me pasan un title busco en la db los que coincidan
            const filteredServices = [];
            dbServices.map((service) => {
              if (service.title.toLowerCase().includes(name.toLowerCase()))
                filteredServices.push(service);
            });
            return res.send(filteredServices); //Si coincide mando el servicio con ese title
          } else return dbServices; //Si no, devuelvo todos los servicios
        }
      
    }

  }
}

module.exports = servicesFilters;
