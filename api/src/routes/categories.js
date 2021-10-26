var express = require('express');
var router = express.Router();
var { getCategories } = require('../controllers/categories');

router.get('/', getCategories);

module.exports = router;
