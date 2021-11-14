const { Province, City } = require("../db");

async function getProvinces(req, res, next) {
  try {
    const { provinceId } = req.query;
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

module.exports = {
  getProvinces,
};
