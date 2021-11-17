var express = require("express");
var router = express.Router();
var { admin } = require("../controllers/admin.js");
var { getServices } = require("../controllers/services.js");

router.get("/", admin);
router.get("/services", getServices);

module.exports = router;
