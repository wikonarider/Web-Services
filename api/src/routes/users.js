var express = require("express");
var router = express.Router();
var {
  userCreated,
  userBanned,
  getUsers,
  postPurchase,
  userEdit,
} = require("../controllers/users");
const {
  isAuthenticated,
  isNotAuthenticated,
} = require("../controllers/authentication");

// User post
router.post("/", isNotAuthenticated, userCreated);
router.post("/purchase", postPurchase);

// User get
router.get("/", getUsers);
router.get("/?username=", getUsers);

// User delete
router.delete("/:id", userBanned);

// User put
router.put("/", isAuthenticated, userEdit);

module.exports = router;
