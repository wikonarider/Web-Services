const { Qualification, conn } = require("../db.js");

const addRating = async (dbServices, id) => {
  let rating = [];
  //si recibe id filtra la consulta a Qualification por ese id
  if (id) {
    rating = await Qualification.findAll({
      attributes: [[conn.fn("AVG", conn.col("score")), "prom_score"]], //Calcula el promedio de score
      where: { serviceId: id },
    });

    dbServices.dataValues.rating = Number(rating[0].dataValues.prom_score);
    return dbServices;
  } else {
    rating = await Qualification.findAll({
      attributes: [
        "serviceId",
        [conn.fn("AVG", conn.col("score")), "prom_score"],
      ],
      group: ["serviceId"],
    });

    //Mapea la consulta de la DB para encontrar el rating de cada servicio
    return dbServices.map((s) => {
      let q = rating.find((r) => {
        return r.dataValues.serviceId == s.dataValues.id;
      });

      q = q ? Number(q.dataValues.prom_score) : null;

      s.dataValues.rating = q;
      return s;
    });
  }
};

module.exports = {
  addRating,
};
