const { Category, Group } = require("../db.js");

async function getGroups(req, res, next) {
  try {
    const groupsInDb = await Group.findAll({
      include: {
        model: Category,
        attributes: ["name", "id"],
      },
      order: ["id", [Category, "name"]],
    });

    res.status(200).send(groupsInDb);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getGroups,
};
