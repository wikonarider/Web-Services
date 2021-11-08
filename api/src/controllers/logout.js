const { Users } = require("../db.js");

async function postLogout(req, res, next) {
  res.clearCookie("userId");
  res.clearCookie("G_AUTHUSER_H");
  res.cookie("userId", "", {
    domain: "https://pf-web-services.herokuapp.com",
    maxAge: 0,
    overwrite: true,
  });
  res.send("user logout");
}

module.exports = {
  postLogout,
};
