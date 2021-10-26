var express = require("express");
var router = express.Router();
var { userCreated, userDeleted } = require("../controllers/users");

router.post("/", userCreated);
router.delete("/:id", userDeleted);

module.exports = router;
