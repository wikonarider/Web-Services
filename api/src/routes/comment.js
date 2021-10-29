var express = require('express');
var router = express.Router();
var { getComment } = require('../controllers/comment');

router.get('/', getComment);

module.exports = router;
