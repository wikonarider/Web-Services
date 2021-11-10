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
const { verifyToken } = require("../controllers/authentication");

// User post
router.post("/", userCreated);
router.get("/purchase",postPurchase);

// User get
router.get("/", verifyToken, getUserInfo);
router.get("/search", verifyToken, getUserAdminSearch);
// User delete
router.delete("/:id", userBanned);

// User put
router.put("/", verifyToken, userEdit);

module.exports = router;
