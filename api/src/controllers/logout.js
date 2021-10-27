const { Users } = require('../db.js');



async function postLogout(req, res, next) {
    const { userId } = req.cookies;
    if ( userId ){
    const user = await Users.findOne({
        where: {
          id: userId,
        }})
    res.clearCookie('userId');
    res.redirect('/services');
    }
    else{
        res.send("user not logged")
    }
}

module.exports = {
    postLogout,
  };