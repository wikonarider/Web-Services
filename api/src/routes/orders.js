var express = require('express');
var router = express.Router();
const {
  getOrder,
  createOrder,
  addServiceToOrder,
  removeServiceFromOrder,
} = require('../controllers/orders');
const { verifyToken } = require('../controllers/authentication');

router.get('/', verifyToken, getOrder);

router.post('/', verifyToken, createOrder);

router.put('/', verifyToken, addServiceToOrder);

router.delete('/', verifyToken, removeServiceFromOrder);

module.exports = router;
