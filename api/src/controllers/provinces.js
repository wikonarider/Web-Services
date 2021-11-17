const { Province, City, Service, conn } = require("../db");

async function getProvinces(req, res, next) {
  try {
    const { provinceId, filter } = req.query;
    if (filter) {
      next();
      return;
    }
    if (provinceId && Number.isNaN(Number(provinceId))) {
      return res.status(400).json({ data: "It has to be of type number" });
    }
    const response = await Province.findAll({
      include: {
        model: City,
      },
      where: provinceId && {
        id: provinceId,
      },
      order: ["name", [City, "name"]],
    });

    Object.keys(response).length
      ? res.json(response)
      : res.status(400).json({ data: "Bad provinceId" });
  } catch (e) {
    next(e);
  }
}

async function getProvincesFilters(req, res, next) {
  try {
    const [provinces, metadataP] = await conn.query(
      `
      SELECT p.name, p.id, COUNT(p.name) FROM services AS s
      JOIN provinces AS p
      ON s."provinceId" = p.id
      WHERE s.avaliable = true
      GROUP BY p.name, p.id   
      ORDER BY p.name   
      `
    );

    const [cities, metadataC] = await conn.query(
      `
      SELECT c.name, c.id, c."provinceId", COUNT(c.name) FROM services AS s
      JOIN cities AS c
      ON s."cityId" = c.id
      WHERE s.avaliable = true
      GROUP BY c.name, c.id
      ORDER BY c.name
      `
    );

    res.json({ provinces: provinces, cities: cities });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getProvinces,
  getProvincesFilters,
};
