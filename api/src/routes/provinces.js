var express = require("express");
var router = express.Router();
const { getProvinces } = require("../controllers/provinces");

router.get("/", getProvinces);

module.exports = router;
