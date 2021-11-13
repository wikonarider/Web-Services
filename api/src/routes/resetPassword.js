var express = require("express");
var router = express.Router();
const { resetPassword } = require("../controllers/resetPassword");

router.put("/", resetPassword);

module.exports = router;