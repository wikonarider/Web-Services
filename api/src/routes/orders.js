var express = require('express');
var router = express.Router();
const {
  addServiceToOrder,
  removeServiceFromOrder,
} = require('../controllers/orders');
const { verifyToken } = require('../controllers/authentication');

router.put('/', verifyToken, addServiceToOrder);

router.delete('/', verifyToken, removeServiceFromOrder);

module.exports = router;
