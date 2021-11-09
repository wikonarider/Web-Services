var express = require("express");
var router = express.Router();
const { generateToken } = require("../controllers/authentication");

router.post("/login", generateToken);

module.exports = router;
