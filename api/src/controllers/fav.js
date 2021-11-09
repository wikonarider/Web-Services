const { Service, Services_users_favourites } = require("../db.js");

async function addFavs(req, res, next) {
  try {
    // usuario logeado, uso el id de la cookie
    const userId = req.user;
    const { serviceId } = req.body;
    // si es un numero
    if (typeof serviceId === "number") {
      const service = await Service.findByPk(serviceId);
      if (service) {
        // verifico que no sea el dueño del servicio
        if (service.userId === userId) {
          res
            .status(400)
            .json({ message: "You cannot add your own service to favorites" });
        } else {
          const [fav, created] = await Services_users_favourites.findOrCreate({
            where: {
              serviceId: serviceId,
              userId: userId,
            },
          });
          // Se creo con exito
          if (created) {
            res.json({ message: "Service added to favorites" });
            // Ya existia
          } else {
            res
              .status(400)
              .json({ message: "Service is already in favorites" });
          }
        }
        // No existe el servicio
      } else {
        res.status(404).json({ message: "Service not found" });
      }
    } else {
      res.status(400).json({ message: "ServiceId has to be of type numeric" });
    }
    // verifico si el servicio existe
  } catch (e) {
    next(e);
  }
}
async function getFavs(req, res, next) {
  try {
    const userId = req.user;
    const userFavs = await Services_users_favourites.findAll({
      where: {
        userId: userId,
      },
    });
    userFavs
      ? res.status(200).json(userFavs)
      : res.status(500).json({ message: "cannot get" });
  } catch (e) {
    next(e);
  }
}

async function deleteFav(req, res, next) {
  try {
    const userId = req.user;
    const { serviceId } = req.body;
    if (typeof serviceId === "number") {
      const deletedFav = await Services_users_favourites.destroy({
        where: {
          userId: userId,
          serviceId: serviceId,
        },
      });
      deletedFav
        ? res
            .status(200)
            .json({ message: "deleted successfully: ", deletedFav })
        : res.status(500).json({ message: "sorry, try again" });
    } else {
      res.status(400).json({ message: "ServiceId has to be of type numeric" });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = {
  addFavs,
  getFavs,
  deleteFav,
};
