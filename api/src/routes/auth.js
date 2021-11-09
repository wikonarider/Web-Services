var express = require("express");
var router = express.Router();
const {
  generateToken,
  googleAuthentication,
} = require("../controllers/authentication");

router.post("/login", generateToken);
router.post("/login", googleAuthentication);

module.exports = router;
