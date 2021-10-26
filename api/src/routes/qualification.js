let express = require('express');
let router = express.Router();
var { postComment, deleteComment } = require('../controllers/qualification');

router.post('/', postComment);
router.delete('/:id', deleteComment)

module.exports = router;
