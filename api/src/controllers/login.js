const { Users } = require('../db.js');

async function postLogin(req, res, next) {
    let { username, password } = req.body;

    const userFinded = await Users.findOne({
        where: {
          username: username,
        }})
       console.log(userFinded)
       if(!userFinded){
           return res.send("user incorrect")
       }
        const checkPass = await userFinded.validPassword(password);
    
    if(userFinded.username = username &&  checkPass === true){
        res.cookie('userId',userFinded.id, {expire : new Date() + 9999, httpOnly: true}); // HttpOnly el acceso al script del cliente no esta permitid
        res.send("user logged");
    }  else{
        res.send("password incorrect")
    } 

}

module.exports = {
    postLogin,
  };