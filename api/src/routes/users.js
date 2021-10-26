var express = require("express");
var router = express.Router();
var { userCreated, userDeleted, getUsers } = require("../controllers/users");

router.post("/", userCreated);
router.get("/", getUsers);
router.delete("/:id", userDeleted);

module.exports = router;
