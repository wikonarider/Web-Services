let express = require("express");
let router = express.Router();

var {
  postComment,
  deleteComment,
  putComment,
} = require("../controllers/qualification");
const { verifyToken } = require("../controllers/authentication");

router.post("/", verifyToken, postComment);
router.delete("/:id", verifyToken, deleteComment);
router.put("/", verifyToken, putComment);

module.exports = router;
