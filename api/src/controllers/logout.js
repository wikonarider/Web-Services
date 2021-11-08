const { Users } = require('../db.js');



async function postLogout(req, res, next) {
    
    res.clearCookie('userId');
    res.clearCookie('G_AUTHUSER_H');
   res.send("user logout")
}

module.exports = {
    postLogout,
  };