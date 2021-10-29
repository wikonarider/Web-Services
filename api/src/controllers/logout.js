const { Users } = require('../db.js');



async function postLogout(req, res, next) {
    
    res.clearCookie('userId');
   res.send("user logout")
}

module.exports = {
    postLogout,
  };