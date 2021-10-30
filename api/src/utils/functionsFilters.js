const { Service, Users, Qualification, Category, Group } = require("../db.js");
const { Op } = require("sequelize");

//------------------------------------------------------------------------------------------------------price

async function orderByPrice(objQuery, res, next) {
  const { order } = objQuery;
  let priceFilter
  if (order === "ASC") {
    
    priceFilter = await Service.findAll({
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
      order: [["price", "ASC"]],
    });
  } else {
    priceFilter = await Service.findAll({
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
      order: [["price", "DESC"]],
    });
  }
  return res.status(200).send(priceFilter);
}
//--------------------------------------------------------------------------------------price range
async function filterByPriceRange(objQuery, res, next) {
  const { startRange, endRange } = objQuery;
  let rangeFilter = await Service.findAll({
    attributes: ["id", "title", "img", "description", "price", "userId"],
    where: {
      price: {
        [Op.between]: [startRange, endRange],
      },
    },
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
    order: [["price", "ASC"]],
  });
  res.status(200).send(rangeFilter);
}
//-------------------------------------------------------------------------------------------date create
async function orderByCreatedDate(objQuery, res, next) {
  const { order } = objQuery;
  let dateFilter
console.log("llego", order)
  if (order === "ASC") {
    dateFilter = await Service.findAll({
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
      order: [["createdAt", "ASC"]],
    });
  } else {
     dateFilter = await Service.findAll({
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
      order: [["createdAt", "DESC"]],
    });
  }
  console.log("esto es",dateFilter)
  res.status(200).send(dateFilter);
}
//-------------------------------------------------------------------------------------------------date update
async function orderByUpdateDate(objQuery, res, next) {
  const { order } = objQuery;
  let dateFilter
  if (order === "ASC") {
    dateFilter = await Service.findAll({
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
      order: [["updatedAt", "ASC"]],
    });
  } else {
    dateFilter = await Service.findAll({
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
      order: [["updatedAt", "DESC"]],
    });
  }
  res.status(200).send(dateFilter);
}

//--------------------------------------------------------------------------------------------------title
async function orderTitle( title, res, next) {
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

  var filteredServices = [];
  dbServices.map((service) => {
    if (service.title.toLowerCase().includes(title.toLowerCase()))
      filteredServices.push(service);
  });
  return res.send(filteredServices); //Si coincide mando el servicio con ese title
}

//-------------------------------------------------------------------------------------------orderByScore
async function orderByQualifications(objQuery, res, next) {  
  console.log("llego")
const { order } = objQuery;
console.log("llego")
let scoreFilter
if (order === "ASC") {
  scoreFilter = await Qualification.findAll({
    attributes : ["score"],
    include: [
      {
        model: Service,
        attributes: ["id", "title", "img", "description", "price", "userId"],
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
      },
    ],
    order: [["score", "DESC"]],
  });
} else {
  scoreFilter = await Qualification.findAll({
    attributes : ["score"],
    include: [
      {
        model: Service,
        attributes: ["id", "title", "img", "description", "price", "userId"],
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
      },
    ],
    order: [["score", "DESC"]],
  });
}res.status(200).send(scoreFilter);}
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
