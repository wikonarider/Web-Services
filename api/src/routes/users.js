var express = require("express");
var router = express.Router();
var {
  userCreated,
  userBanned,
  getUsers,
  postPurchase,
  userEdit,
} = require("../controllers/users");

router.post("/", userCreated);
router.post("/purchase", postPurchase);

router.get("/", getUsers);
router.get("/?username=", getUsers);

router.delete("/:id", userBanned);

router.put("/", userEdit);

module.exports = router;
