var express = require("express");
var router = express.Router();
var { userCreated, userBanned, getUsers } = require("../controllers/users");

router.post("/", userCreated);

router.get("/", getUsers);
router.get("/?username=", getUsers);

router.delete("/:id", userBanned);

module.exports = router;
