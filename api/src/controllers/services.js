const db = require("../db.js");
const { addRating } = require("../utils/index");
const servicesFilters = require("../utils/routeFilterAndOrder.js");
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
const { validateServices } = require("../utils/validServices");

//por cada ruta un controler
async function getServices(req, res, next) {
  const { title } = req.query;
  let dbServices;
  if (Object.values(req.query).length) {
    //compruebo si query tiene propiedades para filtrar
    servicesFilters(req.query, res, next); // se encarga de todo lo relacionado con filtros
  } else {
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

    //FILTRO POR FECHA
    /* if (dateOrder) {
      filterByDate(order);
    }

    //FILTRO POR RANGO
    if (startRange & endRange) {
      let filteredByPriceRange = await filterByPriceRange(startRange, endRange);
      return res.send(filteredByPriceRange);
    }
    }*/

    if (!title) return res.send(dbServices);
    //Devuelvo todos los servicios
    else {
      if (dbServices.length > 0) {
        if (title) {
          //si me pasan un title busco en la db los que coincidan
          const filteredServices = [];
          dbServices.map((service) => {
            if (service.title.toLowerCase().includes(title.toLowerCase()))
              filteredServices.push(service);
          });
          return res.send(filteredServices); //Si coincide mando el servicio con ese title
        } else return dbServices; //Si no, devuelvo todos los servicios
      }
    }
  }
}
//----------------------------------------------------------------------------------------------------------
async function postServices(req, res, next) {
 const { userId } = req.cookies;                               
  const { title, img, description, price, categoryId, provinces, cities  } =
    req.body;
  // si se pasaron todos los parametros 
  if (title && img && description && price && categoryId && provinces) {
    const errors = await validateServices(req.body);
    // si son todos los parametros validos
    if (!Object.keys(errors).length) {
      var service;
      try {
        service = await Service.create({
          ...req.body,
          userId,
          categoryId,
        });
        var [p] = await Services_provinces.findOrCreate({
          where: {
            serviceId: service.id,
            provinceId: provinces.id,
          },
        });
      } catch (error) {
        next(error);
      }
//
      var c = cities.map((e) => {
        return Services_cities.findOrCreate({
          where: {
            cityId: e,
            serviceId: p.dataValues.serviceId,
          },
        });
      });
      Promise.all(c)
        .then(([provAndcity]) => {
          return service.addProvince(provAndcity.dataValues);
        })
        .then(() => {
          res.status(200).send("Created Service");
        })
        .catch((e) => next(e));
    } else {
      res.status(400).json({ data: "All parameters are required" });
    }
  } else {
    res.status(400).json({ data: "All parameters are required" });
  }
}
//----------------------------------------------------------------------------------------------------------
async function getServicesById(req, res, next) {
  let { id } = req.params;

  try {
    let service = await Service.findOne({
      where: {
        id: id,
      },
      attributes: [
        "id",
        "title",
        "img",
        "description",
        "price",
        "createdAt",
        "updatedAt",
        "userId",
      ],
      include: [
        {
          model: Qualification,
          include: {
            model: Users,
            attributes: ["userImg", "username"],
          },
        },
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

    service = await addRating(service, service.id);

    let user = await Users.findOne({
      where: {
        id: service.dataValues.userId,
      },
      attributes: ["id", "userImg", "username", "name", "lastname", "email"],
    });

    service
      ? res.status(200).send({ service, user })
      : res.status(404).send({ message: `Service (id: ${id}) not found` });
  } catch (e) {
    next(e);
  }
}
//----------------------------------------------------------------------------------------------------------
async function deleteServices(req, res, next) {
  let { id } = req.params;
  try {
    let service = await Service.findOne({
      where: {
        id: id,
      },
    });
    if (service === null) {
      res.send("service not founded");
    }
    await Service.destroy({
      where: { id: id },
    });
    res.send("service deleted");
  } catch (err) {
    next(err);
  }
}

//----------------------------------------------------------------------------------------------------------
function putServiceById(req, res, next) {
  var { title, description, img, price, id, categoryId } = req.body;

  if (title && description && img && price && categoryId && id) {
    var errors = validateServices(req.body);
    if (!Object.values(errors).length) {
      Service.findByPk(id)
        .then((service) => {
          return service.update({ title, description, img, price, categoryId });
        })
        .then((result) => {
          res.status(200).send(result.dataValues);
        })
        .catch((error) => next(error));
    } else {
      res.status(500).send(errors);
    }
  } else {
    res.status(500).send("All parameters are required");
  }
}

//----------------------------------------------------------------------------------------------------------

module.exports = {
  getServices,
  postServices,
  getServicesById,
  deleteServices,
  putServiceById,
};
