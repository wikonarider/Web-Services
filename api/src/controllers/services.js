const { Service, Users, Qualification, Category, Group } = require("../db.js");
const { validateServices } = require("../utils/validServices");

//por cada ruta un controler
async function getServices(req, res, next) {
  const { title } = req.query;

  try {
    const dbServices = await Service.findAll({
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

    if (!title) return res.send(dbServices);
    //Devuelvo todos los servicios
    else {
      if (dbServices.length > 0) {
        if (title) {
          //si me pasan un title busco en la db los que coincidan
          filteredServices = [];
          dbServices.map((service) => {
            if (service.title.toLowerCase().includes(title.toLowerCase()))
              filteredServices.push(service);
          });
          return res.send(filteredServices); //Si coincide mando el servicio con ese title
        } else return dbServices; //Si no, devuelvo todos los servicios
      }
    }
  } catch (err) {
    next(err);
  }
}

async function postServices(req, res, next) {
  try {
    const { userId } = req.cookies;
    // si esta logeado
    if (userId) {
      // si existe el user
      const user = await Users.findByPk(userId);
      if (user) {
        const { title, img, description, price, categoryId } = req.body;
        // si se pasaron todos los parametros
        if (title && img && description && price && categoryId) {
          const errors = await validateServices(req.body);
          // si son todos los parametros validos
          if (!Object.keys(errors).length) {
            await Service.create({ ...req.body, userId, categoryId });
            res.json({ data: "Service created " });
          } else {
            res.status(400).json({ data: errors });
          }
        } else {
          res.status(400).json({ data: "All parameters are required" });
        }
      } else {
        res.status(400).json({ data: "User not found" });
      }
    } else {
      res.status(400).json({ data: "User not logged in" });
    }
  } catch (e) {
    next(e);
  }
}

async function getServicesById(req, res, next) {
  let { id } = req.params;

  try {
    let service = await Service.findOne({
      where: {
        id: id,
      },
      include: [
        Qualification,
        {
          model: Category,
          include: {
            model: Group,
          },
        },
      ],
    });

    service
      ? res.status(200).send(service)
      : res.status(404).send({ message: `Service (id: ${id}) not found` });
  } catch (e) {
    next(e);
  }
}

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

//____________________________________________________________________________
function putServiceById(req, res, next) {
  var { title, description, img, price, id } = req.body;

  Service.findByPk(id)
    .then((service) => {
      return service.update({ title, description, img, price });
    })
    .then((res) => {
      res.status(200).send(res.dataValues);
    })
    .catch((error) => next(error));
}

//________________________________________________________________________

module.exports = {
  getServices,
  postServices,
  getServicesById,
  deleteServices,
};
