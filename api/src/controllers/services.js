const {
  Service,
  Users,
  Qualification,
  Category,
  Group,
  conn,
  Services_provinces,
  Services_cities,
} = require("../db.js");
const { validateServices } = require("../utils/validServices");
const { validFilters } = require("../utils/validFilters");
const { Op } = require("sequelize");

const dictonary = {
  price: "service.price",
  rating: "qualifications.score",
  date: "service.createdAt",
};

async function getServices(req, res, next) {
  try {
    const {
      order,
      province,
      cities,
      category,
      startRange,
      endRange,
      type,
      page,
      pageSize,
      userId,
    } = req.query;
    if (userId) {
      next();
    }
    const errors = await validFilters(req.query, dictonary);

    if (!Object.keys(errors).length) {
      const services = await Service.findAll({
        attributes: [
          "id",
          "title",
          "img",
          "price",
          "userId",
          [conn.fn("AVG", conn.col("qualifications.score")), "rating"],
        ],

        where:
          startRange && endRange
            ? {
                price: {
                  [Op.between]: [startRange, endRange],
                },
              }
            : {},
        include: [
          {
            model: Category,
            attributes: ["name"],
            include: {
              model: Group,
              attributes: ["name"],
            },
            where: category && {
              name: category.split(","),
            },
          },
          {
            model: Qualification,
            attributes: [],
          },
        ],
        raw: false,
        group: ["service.id", "category.id", "category->group.id"],
        subQuery: false,
        // paginado
        offset: page && pageSize ? page * pageSize : null,
        limit: page && pageSize ? pageSize : null,
        order: order && [
          order === "rating"
            ? [
                conn.fn("AVG", conn.col(dictonary[order])),
                type ? type + " NULLS LAST" : "DESC NULLS LAST",
              ]
            : [
                conn.col(dictonary[order]),
                type ? type + " NULLS LAST" : "DESC NULLS LAST",
              ],
        ],
      });
      res.json(services);
    } else {
      res.status(400).json(errors);
    }
  } catch (e) {
    next(e);
  }
}

//----------------------------------------------------------------------------------------------------------
async function postServices(req, res, next) {
  const { userId } = req.cookies;
  const { title, img, description, price, categoryId, provinces, cities } =
    req.body;
  // si se pasaron todos los parametros
  if (
    title &&
    img &&
    description &&
    price &&
    categoryId &&
    provinces &&
    Object.values(cities).length
  ) {
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
        [conn.fn("AVG", conn.col("qualifications.score")), "rating"],
      ],
      include: [
        {
          model: Qualification,
          include: {
            model: Users,
            attributes: ["userImg", "username", "name", "lastname"],
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
      raw: false,
      group: [
        "service.id",
        "category.id",
        "category->group.id",
        "qualifications.id",
        "qualifications->user.id",
      ],
    });

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
