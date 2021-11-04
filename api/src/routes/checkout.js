const { Users } = require('../db');

var express = require('express');
var router = express.Router();
const {
  validatePurchase,
} = require('../utils/validUser');


var mercadopago = require("mercadopago");
const { response } = require('express');
mercadopago.configure({
  access_token:
    "APP_USR-6630129852838408-110415-697a3bf876a306168b38ca0aff892c43-1012143804",
});

router.post("/", async (req, res) => {
  try {
    const { totalPrice, title, quantity, servicesId} = req.body;
    console.log('totalPrice' ,req.body)
    const {userId} = req.cookies
    // var unit_price = totalPrice / quantity;

    var preference = {
      items: [
        {
          title: title,
          quantity: quantity,
          unit_price: totalPrice,
          serviceId : servicesId
        },
      ],
      back_urls: {
        success: `http://localhost:3001/users/purchase?state=success&servicesId=${servicesId}&userId=${userId}`,
        failure: "http://localhost:3000/rechazo",
        pending: "http://localhost:3000/home",
      },
      auto_return: "approved",
    };

// console.log('mercadoPreferences', mercadopago.preferences)
   await mercadopago.preferences.create(preference).then(function(response){
        //  console.log(response.body)
         res.send(response.body.init_point)
         
         
         
        });
        
        // if (servicesId && userId){

        //      if (await validatePurchase(servicesId, userId)) {
        //       console.log('USERID', userId);
        //       console.log('SERVICESID', servicesId);
        //       const user = await Users.findByPk(userId);
        //       // console.log para ver los metodos disponibles
        //       // console.log(Object.keys(user.__proto__));
        //       console.log('userEnBakc', user)
        //       await user.setServicesBought(servicesId);
        //       res.json({ message: 'Success purchase' });
        //     } else {
        //       res.status(400).json({
        //         message:
        //           'Only arrangement of valid services, or services that are not the owner ',
        //       });
        //     }
     

        // }
      
        
    
  } catch (error) {
    console.log('MERCADO',error)
  }
});


async function postPurchase(req, res, next) {
  //necesitamos estos datos para asociar el servicio comprado a la categoría
  try {
    const { userId } = req.cookies;
    const { servicesId } = req.body;

    // validamos que sea un arreglo de servicios y
    // que el esos servicios no pertenezcan al usuario
    if (await validatePurchase(servicesId, userId)) {
      console.log('USERID', userId);
      console.log('SERVICESID', servicesId);
      const user = await Users.findByPk(userId);
      // console.log para ver los metodos disponibles
      // console.log(Object.keys(user.__proto__));
      await user.setServicesBought(servicesId);
      res.json({ message: 'Success purchase' });
    } else {
      res.status(400).json({
        message:
          'Only arrangement of valid services, or services that are not the owner ',
      });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = router;
