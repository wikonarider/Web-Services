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

async function deleteComment(req,res,next){
  try {
    const { id } = req.params;
    const commentInDb = await Qualification.findOne({
      // chequeo si existe el usuario
      where: { id: id },
    });
    if (commentInDb === null) {
      res.json({ respones: "comment not founded" });
    } else {
      await Qualification.destroy({
        // si existe lo deleteo
        where: { id: id },
      });
      res.json({ response: "comment deleted" });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = {
  postComment,
  deleteComment,
};
