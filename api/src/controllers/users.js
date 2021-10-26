const { Users, Service } = require("../db");
const { validateUser, checkUnique } = require("../utils/validUser");

async function userCreated(req, res, next) {
  try {
    const { username, email } = req.body;
    // son username y email unicos, avanza
    if (await checkUnique(username, email)) {
      // valida todos los parametros del user
      const errors = validateUser(req.body);
      if (!Object.keys(errors).length) {
        await Users.create(req.body);
        res.json({ response: "created" }); // responde con 200, y created
      } else {
        res.status(400).json({ response: errors });
        // algun parametro invalido.
      }
    } else {
      res
        .status(400)
        .json({ response: "username or email already exist or is empty" });
    }
  } catch (e) {
    next(e);
  }
}

async function getUsers(req, res, next) {
  try {
    const usersDb = await Users.findAll({
      include: [{
        model: Service,
        attributes: [],
      },],
    });
    if(usersDb.length > 0) return res.send(usersDb) 
    else return res.send({ response: "no users yet"})
  } catch (e) {
    next(e);
  }
};

async function userDeleted(req, res, next) {
  try {
    const { id } = req.params;
    const usersInDb = await Users.findOne({
      // chequeo si existe el usuario
      where: { id: id },
    });
    if (usersInDb === null) {
      res.json({ respones: "user not founded" });
    } else {
      await Users.destroy({
        // si existe lo deleteo
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
  getUsers
};
