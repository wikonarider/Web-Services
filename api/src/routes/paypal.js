const paypal = require("paypal-rest-sdk");
const router = require("express").Router();
const { Users } = require('../db');
const { ORIGIN, SUCCESS_MERCADOPAGO } = process.env;
const { verifyToken } = require("../controllers/authentication");

paypal.configure({
    mode:"sandbox",
    client_id: "AXLu37FuQ0PhMkBFF9rM60_ac5w0J6TzcyCtKLZujgM9JcdzdYyrIWdbe0e1FAmfY0puVq6KtjS61DHg",
    client_secret: "EEmJrcGSghPO_7c05NybCHXT6neemGDi90Lg5st49gmKbBnSTDtyX0B8C1G264-unTk-5esuvaBMDmJu"
});



router.post("/", verifyToken, async (req, res) => {
  try{
    let {totalPrice, title, quantity, servicesId} = {...req.body}
    console.log('ESTOY EN BACK',req.body)
    const  userId  = req.user;
    let price = 0
    for (let i=0; i < totalPrice.length; i++){
      price = price + totalPrice[i]
    }
    
    // data.price = Math.round(data.price / 170)
    // data.price = prices
    const user = await Users.findOne({
        attributes: [
          "username",
        ],
        where: {
          id: userId,
        },
      })
   

    var create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url:`${SUCCESS_MERCADOPAGO}/users/purchase?servicesId=${servicesId}&username=${user.username}&status=success`,
            cancel_url: `${ORIGIN}/home`
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            name: title.join(", "),
                            sku: "item",
                            price: price,
                            currency: "USD",
                            quantity: quantity,
                        }
                    ]
                },
                amount: {
                    currency: "USD",
                    total: price,
                },
                description: "This is the payment description."
            }
        ]
    };

    paypal.payment.create(create_payment_json, function(error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            res.json(payment.links[1].href);
        }
    });
} catch(error) {
    console.log(error)
  }
});


router.get("/success", (req, res) => {
    // res.send("Success");
    var PayerID = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var execute_payment_json = {
        payer_id: PayerID,
        transactions: [
            {
                amount: {
                    currency: "USD",
                    total: (quantity * price)
                }
            }
        ]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function(
        error,
        payment
    ) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.render("success");
        }
    });
});

router.get("cancel", (req, res) => {
    res.send("cancel");
});


module.exports = router;