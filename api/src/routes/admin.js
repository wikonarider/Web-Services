var express = require("express");
var router = express.Router();
var { admin, adminServices } = require("../controllers/admin.js");

router.get("/", admin);
router.get("/services", adminServices);

module.exports = router;
