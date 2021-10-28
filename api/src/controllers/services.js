const { Service, Users, Qualification, Category, Group } = require("../db.js");

//por cada ruta un controler
async function getServices(req, res, next) {
  const { title } = req.query;

  try {
    const dbServices = await Service.findAll({
      //Traigo todo de la db
      include: {
        model: Users,
        through: { attributes: [] },
      },
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
    //userName eventualmente debería ser enviada por cookie
    const { title, img, description, price, userName } = req.body;
    //busco el user que lo creó para asociárselo
    const userFound = await Users.findOne({
      where: {
        username: userName,
      },
    });

    if (userFound) {
      //creo el servicio y asocio el servicio creado al user que lo creó
      const serviceCreated = await Service.create({
        title,
        img,
        description,
        price,
        userId: userFound.id,
      });

      return res.status(200).send(serviceCreated);
    }

    return res.status(200).send({ message: "User Not Found" });
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
