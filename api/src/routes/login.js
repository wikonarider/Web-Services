var express = require("express");
var router = express.Router();
var { postLogin, checkLogin } = require("../controllers/login");

router.post("/", postLogin);

router.get("/", checkLogin);

module.exports = router;
