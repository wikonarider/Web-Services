var express = require('express');
var router = express.Router();
var { postLogout } = require('../controllers/logout');

router.post('/', postLogout);

module.exports = router;