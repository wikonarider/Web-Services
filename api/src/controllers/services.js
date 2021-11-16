const {
  Service,
  Users,
  Qualification,
  Category,
  Group,
  Province,
  City,
  conn,
  Op,
} = require("../db.js");
const {
  validateServices,
  validateServicesEdit,
  validateUUID,
} = require("../utils/validServices");
const { validFilters, makeWhereFilter } = require("../utils/validFilters");
const { addRating } = require("../utils/OldFilters/index");

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
      city,
      category,
      startRange,
      endRange,
      type,
      page,
      pageSize,
      userId,
      title,
      ids,
    } = req.query;
    if (userId || ids) {
      next();
      return;
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
          "avaliable",
          [conn.fn("AVG", conn.col("qualifications.score")), "rating"],
        ],

        where: makeWhereFilter(startRange, endRange, title),
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
          {
            model: Province,
            attributes: ["name"],
            where: province && {
              name: province,
            },
          },
          {
            model: City,
            attributes: ["name"],
            where: city && {
              name: city,
            },
          },
        ],
        raw: false,
        group: [
          "service.id",
          "category.id",
          "category->group.id",
          "province.id",
          "city.id",
        ],
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

async function getServicesByUserId(req, res, next) {
  try {
    const { userId, ids } = req.query;
    if (ids) {
      next();
      return;
    }
    if (validateUUID(userId)) {
      const services = await Service.findAll({
        attributes: [
          "id",
          "title",
          "img",
          "price",
          "userId",
          [conn.fn("AVG", conn.col("qualifications.score")), "rating"],
        ],
        where: {
          userId: userId,
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
          {
            model: Qualification,
            attributes: [],
          },
        ],

        raw: false,
        group: ["service.id", "category.id", "category->group.id"],
      });

      let user = await Users.findOne({
        where: {
          id: userId,
        },
        attributes: ["name", "lastname", "userImg"],
      });

      res.json([user, services]);
    } else {
      res.status(400).json({ message: "UserId it has to be a UUIDV4 " });
    }
  } catch (e) {
    next(e);
  }
}

async function getServicesByIds(req, res, next) {
  try {
    const { ids } = req.query;
    const services = await Service.findAll({
      attributes: [
        "id",
        "title",
        "img",
        "price",
        "userId",
        [conn.fn("AVG", conn.col("qualifications.score")), "rating"],
      ],

      where: {
        id: ids.split(","),
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
        {
          model: Qualification,
          attributes: [],
        },
      ],
      raw: false,
      group: ["service.id", "category.id", "category->group.id"],
      subQuery: false,
    });
    res.json(services);
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
        "createdAt",
        "updatedAt",
        "userId",
        "avaliable",
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
          attributes: ["name", "id"],
          include: {
            model: Group,
            attributes: ["name", "id"],
          },
        },
        {
          model: Province,
          attributes: ["name"],
        },
        {
          model: City,
          attributes: ["name", "lat", "lon"],
        },
      ],
    });

    if (service) {
      service = await addRating(service, service.id);

      let user = await Users.findOne({
        where: {
          id: service.dataValues.userId,
        },
        attributes: ["id", "userImg", "username", "name", "lastname", "email"],
      });

      res.status(200).send({ service, user });
    } else {
      res.status(404).send({ message: `Service (id: ${id}) not found` });
    }
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
async function postServices(req, res, next) {
  try {
    const userId = req.user;
    const { title, img, description, price, categoryId, provinceId, cityId } =
      req.body;
    if (
      title &&
      img &&
      description &&
      price &&
      categoryId &&
      provinceId &&
      cityId
    ) {
      const errors = await validateServices(req.body);
      // si son todos los parametros validos
      if (!Object.keys(errors).length) {
        await Service.create({
          ...req.body,
          userId: userId,
        });
        res.json({ message: "Successfully created service" });
      } else {
        res.status(400).json(errors);
      }
    } else {
      res.status(400).json({ message: "All parameters are required" });
    }
  } catch (e) {
    next(e);
  }
}
//----------------------------------------------------------------------------------------------------------
async function putService(req, res, next) {
  try {
    const userId = req.user;
    const {
      title,
      img,
      description,
      price,
      categoryId,
      provinceId,
      cityId,
      serviceId,
      avaliable,
    } = req.body;
    // Paso serviceId por body
    if (serviceId) {
      const service = await Service.findByPk(serviceId);
      // Existe el servicio y pertene al usuario logueado
      if (service && service.userId === userId) {
        if (
          title ||
          img ||
          description ||
          price ||
          categoryId ||
          provinceId ||
          cityId ||
          avaliable
        ) {
          // validamos los parametros, caso especial para provincia/ciudad
          const errors = await validateServicesEdit({
            ...req.body,
            provinceId: provinceId ? provinceId : service.provinceId,
            cityId: cityId ? cityId : service.cityId,
          });
          if (!Object.keys(errors).length) {
            // Cambiamos los datos que se pasaron
            service.title = title ? title : service.title;
            service.img = img ? img : service.img;
            service.description = description
              ? description
              : service.description;
            service.price = price ? price : service.price;
            service.categoryId = categoryId ? categoryId : service.categoryId;
            service.provinceId = provinceId ? provinceId : service.provinceId;
            service.cityId = cityId ? cityId : service.cityId;
            service.avaliable = avaliable
              ? avaliable === "true"
              : service.avaliable;
            // Guardamos esos cambios
            await service.save();
            res.json({ message: "Successfully edited service" });
          } else {
            res.status(400).json(errors);
          }
        } else {
          res
            .status(400)
            .json({ message: "At least one parameter is required" });
        }
      } else {
        res.status(400).json({ message: "Must be the owner of the service" });
      }
    } else {
      res.status(400).json({ message: "Service id is required" });
    }
  } catch (e) {
    next(e);
  }
}

//----------------------------------------------------------------------------------------------------------

module.exports = {
  getServices,
  postServices,
  getServicesById,
  deleteServices,
  putService,
  getServicesByUserId,
  getServicesByIds,
};
