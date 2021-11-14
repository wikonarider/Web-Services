const { Users } = require("../db");
const nodemailer = require('nodemailer');
const { SECRET_KEY, ORIGIN } = process.env;
const jwt = require("jsonwebtoken");


async function resetPassword(req, res, next) {
    const { resetPassword, newPassword } = req.body
    try {

        if (resetPassword) {
            jwt.verify(resetPassword, SECRET_KEY, async function (err, decodedData) {
               
                if (err) {
                    return res.status(401).json({ error: 'Incorret Token' })
                }

           var userFound = await  Users.findOne({
                    where: {
                        resetPassword : resetPassword
                    }
                },
                 (err, user) => {
                    if (err || !user){
                        return res.status(400).json({error : 'User with this token does not exist'})
                    }
                })

                if (userFound){ 
  
                    await  userFound.update({
                    password : newPassword
                })

                res.status(200).send(userFound)
                console.log('Contraseña cambiada')
            }
         })

        } else {
            return res.status(401).json({ error: 'Auth error' })
        }

    } catch (err) {
        next(err)
    }
}

module.exports = {
    resetPassword
  };