var express = require("express");
var router = express.Router();
var { admin } = require("../controllers/admin.js");

router.get("/", admin);

module.exports = router;
