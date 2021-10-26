let express = require('express');
let router = express.Router();
var { postComment } = require('../controllers/qualification');

router.post('/', postComment);

module.exports = router;
