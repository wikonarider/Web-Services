const { Users } = require("../db.js");

async function postLogout(req, res, next) {
  res.clearCookie("userId");
  res.clearCookie("G_AUTHUSER_H");
  res.setHeader("set-cookie", "userId=; max-age=0");
  res.send("user logout");
}

module.exports = {
  postLogout,
};
