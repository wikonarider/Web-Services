var express = require("express");
var router = express.Router();
const {
  getProvinces,
  getProvincesFilters,
} = require("../controllers/provinces");

router.get("/", getProvinces);
router.get("/", getProvincesFilters);

module.exports = router;
