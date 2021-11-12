const router = require('express').Router();
const { verifyToken } = require('../controllers/authentication');
const { checkoutPaypal, paypalSuccess } = require('../controllers/paypal');

router.post('/', verifyToken, checkoutPaypal);

router.get('/success', paypalSuccess);

router.get('cancel', (req, res) => {
  res.send('cancel');
});

module.exports = router;
