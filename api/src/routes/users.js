var express = require("express");
var router = express.Router();
var {
  userCreated,
  userBanned,
  getUserInfo,
  getUserAdminSearch,
  postPurchase,
  userEdit,
} = require("../controllers/users");
const {
  isAuthenticated,
  isNotAuthenticated,
} = require("../controllers/authentication");

// User post
router.post("/", isNotAuthenticated, userCreated);
router.get("/purchase", postPurchase);

// User get
router.get("/", isAuthenticated, getUserInfo);
router.get("/search", isAuthenticated, getUserAdminSearch);
// User delete
router.delete("/:id", userBanned);

// User put
router.put("/", isAuthenticated, userEdit);

module.exports = router;
