

var express = require('express');
var router = express.Router();


var mercadopago = require("mercadopago");
mercadopago.configure({
  access_token:
    "APP_USR-1640194233817832-110322-6ef1922bf0bebe451285b8073278e5d7-437890976",
});

router.post("/", async (req, res) => {
  try {
    const { totalPrice, title, quantity } = req.body;
    var unit_price = totalPrice / quantity;

    var preference = {
      items: [
        {
          title: title,
          quantity: quantity,
          unit_price: unit_price
        },
      ],
      back_urls: {
        success: "http://localhost:3000/home",
        failure: "http://localhost:3000/rechazo",
        pending: "http://localhost:3000/home",
      },
      auto_return: "approved",
    };

   await mercadopago.preferences.create(preference).then(function(response){
         console.log(response.body)
         res.redirect(response.body.init_point)
     });
    
  } catch (error) {
    console.log('MERCADO',error)
  }
});

module.exports = router;
