var express = require('express');
var router = express.Router();
var { postLogin } = require('../controllers/login');

router.post('/', postLogin);

module.exports = router;
