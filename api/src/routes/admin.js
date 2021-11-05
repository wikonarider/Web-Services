var express = require("express");
var router = express.Router();
var { admin } = require("../controllers/admin.js");
const {
  isAuthenticated,
  isNotAuthenticated,
} = require("../controllers/authentication");

router.get("/", admin);

module.exports = router;