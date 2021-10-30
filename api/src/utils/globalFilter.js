const Service = require("../db");

const sortBy = function (array, title, category, order) {
  function containsData(arg) {
    //validacion
    if (arg !== "undefined" && arg) {
      return true;
    }
    return false;
  }
  //title null null
  if (containsData(title) && !containsData(category) && !containsData(order)) {
    return array.filter((service) => {
      return service.title.toLowerCase().includes(title.toLowerCase());
    });
  }
  //null category order
  if (!containsData(title) && containsData(category) && containsData(order)) {
    return orderBy(array, category, order);
  }
  //title category order
  if (containsData(title) && containsData(category) && containsData(order)) {
    return array;
  }
  //title category null
  if (containsData(title) && containsData(category) && !containsData(order)) {
    return array;
  }
  //title null order
  if (containsData(title) && !containsData(category) && containsData(order)) {
    return array;
  }
  return array;
}; //________sortBy

// -------------------------------------------------------------------------function order
function orderBy(array, category, order) {
  var dbServices = array;

  switch (category) {
    case "price": //______________________________________________________________order price
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
      return dbServices;
    case "group-asc": //______________________________________________________________order price
      return Service.findAll({
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
        .then((range) => {
          return rangeFilter;
        })
        .catch((e) => {
          return new Error(e);
        });

    case "city": //______________________________________________________________order city
    case "price": //______________________________________________________________order price
    case "price": //______________________________________________________________order price
    case "price": //______________________________________________________________order price
    case "price": //______________________________________________________________order price
  }
}

module.exports = sortBy;
