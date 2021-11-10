var express = require("express");
var router = express.Router();
var { addFavs, getFavs, deleteFav } = require("../controllers/fav");
const { verifyToken } = require("../controllers/authentication");

// post
router.post("/", verifyToken, addFavs);

//get
router.get("/", verifyToken, getFavs);

//delete
router.delete("/", verifyToken, deleteFav);

module.exports = router;
