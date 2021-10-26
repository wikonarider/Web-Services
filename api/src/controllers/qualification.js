const { Qualification } = require('../db');

async function postComment(req, res, next) {
  try {
    const { comment, score } = req.body;
    await Qualification.create({
      comment,
      score,
    });
    res.json({ response: 'comment posted' });
  } catch (e) {
    next(e);
  }
}

async function putComment(req, res, next) {
  try {
    //recibo el nuevo comentario y el id del comentario a modificar
    const { newComment, id } = req.body;

    if (newComment && id) {
      //update busca el comentario que pertenezca a ese id y luego lo modifica en su atributo comment
      const commentFound = await Qualification.update(
        {
          comment: newComment,
        },
        {
          where: { id: id },
        }
      );

      //si el comentario fue encontrado devuelve 1 sino 0
      if (commentFound[0] === 1) {
        return res.json({ response: 'comment modified' });
      } else {
        return res.json({ response: 'comment can not be found' });
      }
    }
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
  putComment,
};
