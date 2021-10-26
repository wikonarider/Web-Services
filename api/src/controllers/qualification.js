const { Qualification } = require("../db");

async function postComment(req, res, next) {
  try {
    const { comment, score } = req.body;
    await Qualification.create({
      comment,
      score,
    });
    res.json({ response: "comment posted" });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  postComment,
};
