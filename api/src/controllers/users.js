const { Users } = require("../db");
const { validateUser, checkUnique } = require("../utils/validUser");

async function userCreated(req, res, next) {
  try {
    const { username, email } = req.body;
    // son username y email unicos, avanza
    if (await checkUnique(username, email)) {
      // valida todos los parametros del user
      if (validateUser(req.body)) {
        await Users.create(req.body);
        res.json({ response: "created" }); // responde con 200, y created
      } else {
        res.status(400).json({ response: "invalid parameters" });
        // algun parametro invalido.
      }
    } else {
      res
        .status(400)
        .json({ response: "username and email already exist or is empty" });
    }
  } catch (e) {
    next(e);
  }
}

async function userDeleted(req, res, next) {
  try {
    const { id } = req.params;
    const usersInDb = await Users.findOne({ // chequeo si existe el usuario
      where: { id: id },
    });
    if (usersInDb === null) {
      res.json({ respones: "user not founded" });
    } else {
      await Users.destroy({ // si existe lo deleteo
        where: { id: id },
      });
      res.json({ response: "user deleted" });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = {
  userCreated,
  userDeleted,
};
