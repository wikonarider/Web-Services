var express = require("express");
var router = express.Router();
var { addFavs, getFavs, deleteFav } = require("../controllers/fav");
const { isAuthenticated } = require("../controllers/authentication");

// post
router.post("/", isAuthenticated, addFavs);

//get
router.get("/", isAuthenticated, getFavs);

//delete
router.delete("/", deleteFav);

module.exports = router;
