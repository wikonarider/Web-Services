var express = require("express");
var router = express.Router();
var { userCreated } = require("../controllers/users");

router.post("/", userCreated);

module.exports = router;
