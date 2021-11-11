let express = require('express');
let router = express.Router();
const {forgotPassword} = require('../controllers/forgotPassword')

router.put('/', forgotPassword)


module.exports = router;