const { Service, Users, Services_users_favourites } = require("../db.js");
// const services_users_favourites = require('../models/Services_users_favourites.js');

async function addFavs(req, res, next) {
  try {
    const { serviceId, userId } = req.body;
    await Service.findByPk(serviceId);
    await Users.findByPk(userId);
    const relation = await Services_users_favourites.create({
      serviceId: serviceId,
      userId: userId,
    });
    relation._options.isNewRecord
      ? res.status(200).json("add fav")
      : res.status(500).json({ message: "cannot add" });
  } catch (e) {
    next(e);
  }
}

async function getFavs(req, res, next) {
  try {
    const { userId } = req.params;
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

async function getFavsServicesData(req,res,next){
  try {
    const { userId } = req.params;
    const userFavs = await Services_users_favourites.findAll({
      where: {
        userId: userId,
      },
    });
    let favServicesIds = [];
    userFavs.map((s) => favServicesIds.push(s.serviceId));

    const servicesData = await Service.findAll({
      where: {
        id: favServicesIds,
      },
    });

    servicesData
      ? res.status(200).json(servicesData)
      : res.status(500).json({ message: "cannot get" });
  } catch (e) {
    next(e);
  }
}

async function deleteFav(req, res, next) {
  try {
    const { userId, serviceId } = req.body;
    const deletedFav = await Services_users_favourites.destroy({
      where: {
        userId: userId,
        serviceId: serviceId,
      },
    });
    deletedFav
      ? res.status(200).json({ message: "deleted successfully: ", deletedFav })
      : res.status(500).json({ message: "sorry, try again" });
  } catch (e) {
    next(e);
  }
}

async function validateFav(req, res, next) {
  try {
    const { id } = req.query;
    const { userId } = req.cookies;

    const userFavs = await Services_users_favourites.findOne({
      where: {
        userId: userId,
        serviceId: Number(id),
      },
    });
    userFavs ? res.status(200).json(true) : res.status(200).json(false);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  addFavs,
  getFavs,
  deleteFav,
  validateFav,
  getFavsServicesData,
};
