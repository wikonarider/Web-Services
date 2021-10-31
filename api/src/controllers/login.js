const { Users } = require("../db.js");

async function postLogin(req, res, next) {
  try {
    let { username, password } = req.body;
    if (username && password) {
      const userFinded = await Users.findOne({
        where: {
          username: username,
        },
      });

      if (!userFinded) {
        return res.status(404).send("user incorrect");
      }
      const checkPass = await userFinded.validPassword(password);
      if ((userFinded.username = username && checkPass === true)) {
        res.cookie("userId", userFinded.id, { expire: new Date() + 9999 }); // HttpOnly el acceso al script del cliente no esta permitido
        var cookie = req.cookies;
        console.log(cookie);
        res.send(userFinded.id);
      } else {
        res.status(404).send("password incorrect");
      }
    } else {
      res.status(404).send("empty parameters");
    }
  } catch (e) {
    next(e);
  }
}

module.exports = {
  postLogin,
};
