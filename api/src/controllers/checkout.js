require('dotenv').config();
const { Users, Orders } = require('../db');
const { ORIGIN, SUCCESS_MERCADOPAGO } = process.env;
var mercadopago = require('mercadopago');

mercadopago.configure({
  access_token:
    'APP_USR-6630129852838408-110415-697a3bf876a306168b38ca0aff892c43-1012143804',
});

async function checkoutMercadoPago(req, res, next) {
  try {
    const { totalPrice, title, quantity, servicesId } = req.body;
    console.log('totalPrice', req.body);
    const userId = req.user;

    let prices = 0;
    for (let i = 0; i < totalPrice.length; i++) {
      prices = prices + totalPrice[i];
    }

    const user = await Users.findOne({
      attributes: ['username'],
      where: {
        id: userId,
      },
    });

    const order = await Orders.findOne({
      where: {
        userId: userId,
        status: 'carrito',
      },
    });
    // cambiamos el estado de la orden
    order.status = 'pending';
    order.total = prices;
    await order.save();

    var preference = {
      items: [
        {
          title: title.join(', '),
          quantity: quantity,
          unit_price: prices,
          serviceId: servicesId,
        },
      ],
      back_urls: {
        success: `${SUCCESS_MERCADOPAGO}/users/purchase?servicesId=${servicesId}&username=${user.username}&orderId=${order.id}`,
        failure: `${ORIGIN}/home`,
        pending: `${ORIGIN}/home`,
      },
      auto_return: 'approved',
    };

    // console.log('mercadoPreferences', mercadopago.preferences)
    await mercadopago.preferences.create(preference).then(function (response) {
      //  console.log(response.body)
      res.send(response.body.init_point);
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
    console.log('MERCADO', error);
    next(error);
  }
}

module.exports = {
  checkoutMercadoPago,
};
