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

module.exports = {
  userCreated,
};
