let express = require('express');
let router = express.Router();

var { postComment, deleteComment, putComment } = require('../controllers/qualification');

router.post('/', postComment);
router.delete('/:id', deleteComment)
router.put('/', putComment);


module.exports = router;
