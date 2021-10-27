var express = require("express");
var router = express.Router();
var { getGroups } = require("../controllers/groups");

router.get("/", getGroups);

module.exports = router;
