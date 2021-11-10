const { Qualification } = require("../db.js");

async function getComment(req, res, next) {
  try {
    const { id } = req.query;
    if (id) {
      const comment = await Qualification.findByPk(id, {
        attributes: ["comment", "score", "id", "serviceId", "userId"],
      });
      if (comment !== null) {
        return res.send(comment);
      } else {
        res.json({ response: "comment not found" });
      }
    } else {
      const comments = await Qualification.findAll({
        attributes: ["comment", "score", "id", "serviceId", "userId"],
      });

      if (comments !== null) {
        res.send(comments);
      } else {
        res.json({ response: "Comments not found" });
      }
    }
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getComment,
};
