let express = require('express');
let router = express.Router();
var { postComment, putComment } = require('../controllers/qualification');

router.post('/', postComment);
router.put('/', putComment);

module.exports = router;
