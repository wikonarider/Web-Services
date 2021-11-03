var express = require("express");
var router = express.Router();
var {
  userCreated,
  userBanned,
  getUserInfo,
  postPurchase,
  userEdit,
} = require("../controllers/users");
const {
  isAuthenticated,
  isNotAuthenticated,
} = require("../controllers/authentication");

// User post
router.post("/", isNotAuthenticated, userCreated);
router.post("/purchase", isAuthenticated, postPurchase);

// User get
router.get("/", isAuthenticated, getUserInfo);

// User delete
router.delete("/:id", userBanned);

// User put
router.put("/", isAuthenticated, userEdit);

module.exports = router;
