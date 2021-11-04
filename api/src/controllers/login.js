const { Users } = require("../db.js");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const express = require("express");
const app = express();

async function postLogin(req, res, next) {
  try {
    let { username, password } = req.body;
    let { token } = req.query;
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
        res.cookie("userId", userFinded.id, {
          expire: new Date() + 9999,
          sameSite: app.get("env") === "development" ? true : "none",
          secure: app.get("env") === "development" ? false : true,
        }); // HttpOnly el acceso al script del cliente no esta permitido
        return res.send(userFinded.id);
      } else {
        return res.status(404).send("password incorrect");
      }
    }
    if (token) {
      console.log(token);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience:
          "316128007785-fif02sojlsoinu9s5eugus3qaagiclid.apps.googleusercontent.com",
      });
      const { email } = ticket.getPayload();
      const user = await Users.findOne({
        where: { email: email },
      });
      if (user) {
        res.cookie("userId", user.id, { expire: new Date() + 9999 });
        //req.session.user.Id = user.id
        res.clearCookie("G_AUTHUSER_H");
        return res.send(user.id);
      } else {
        res.clearCookie("G_AUTHUSER_H");
        return res.status(404).send("Unregistered user");
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
