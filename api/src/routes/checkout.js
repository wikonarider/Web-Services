var express = require('express');
var router = express.Router();
const { verifyToken } = require('../controllers/authentication');
const { checkoutMercadoPago } = require('../controllers/checkout');

router.post('/', verifyToken, checkoutMercadoPago);

module.exports = router;
