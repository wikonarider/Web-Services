const { Qualification, User } = require("../db");

async function postComment(req, res, next) {
  try {
    const userId = req.user;
    const { comment, score, serviceId } = req.body;
    await Qualification.create({
      comment,
      score,
      userId,
      serviceId,
    });

    res.json({ response: "comment posted" });
  } catch (e) {
    next(e);
  }
}

async function putComment(req, res, next) {
  try {
    //recibo el nuevo comentario y el id del comentario a modificar
    const { newComment, id, newScore } = req.body;

    if (id) {
      const comment = await Qualification.findByPk(id, {
        attributes: ["comment", "score", "id", "serviceId", "userId"],
      });

      comment.comment = newComment ? newComment : comment.comment;
      comment.score = newScore ? newScore : comment.score;

      await comment.save();
      res.json({ data: "Comment edited" });
    } else {
      res.status(400).json({ data: "Comment id not received" });
    }
  } catch (e) {
    next(e);
  }
}

async function deleteComment(req, res, next) {
  try {
    const { id } = req.params;
    const commentInDb = await Qualification.findOne({
      // chequeo si existe el usuario
      where: { id: id },
    });
    if (commentInDb === null) {
      res.json({ response: "comment not found" });
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
  putComment,
};
