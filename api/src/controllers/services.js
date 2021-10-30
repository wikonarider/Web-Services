const db = require("../db.js");
const { addRating } = require("../utils/index");
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
const servicesFilters = require("../utils/routeFilterAndOrder.js");
const { validateServices } = require("../utils/validServices");
//-----------------------------------------------------------------------------------------
function getServices(req, res, next) {
  if (Object.values(req.query).length) {
    //compruebo si query tiene propiedades para filtrar
    servicesFilters(req.query, res, next);
  } else {
    Service.findAll({
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
    })
      .then((resp) => {
        res.status(200).send(resp);
      })
      .catch((err) => {
        next(err);
      });
  }
}
//----------------------------------------------------------------------------------------------------------
async function postServices(req, res, next) {
  try {
    const { userId } = req.cookies;

    const { title, img, description, price, categoryId, provinces } = req.body;
    // si se pasaron todos los parametros
    if (title && img && description && price && categoryId && provinces) {
      const errors = await validateServices(req.body);
      // si son todos los parametros validos
      if (!Object.keys(errors).length) {
        const service = await Service.create({
          ...req.body,
          userId,
          categoryId,
        });

        const promises = [];
        // cargo las provincias
        provinces.forEach((p) => {
          promises.push(
            Services_provinces.findOrCreate({
              where: {
                serviceId: service.id,
                provinceId: p.id,
              },
            })
          );
          // cargo las ciudades
          p.cities.forEach((c) => {
            promises.push(
              Services_cities.findOrCreate({
                where: {
                  cityId: c,
                  serviceId: service.id,
                },
              })
            );
          });
        });
        await Promise.all(promises);
        res.json({ data: "Service created " });
      } else {
        res.status(400).json({ data: errors });
      }
    } else {
      res.status(400).json({ data: "All parameters are required" });
    }
  } catch (e) {
    next(e);
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
        "userId",
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
