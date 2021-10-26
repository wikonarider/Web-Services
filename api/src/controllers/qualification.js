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

module.exports = {
  postComment,
  putComment,
};
