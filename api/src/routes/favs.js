var express = require("express");
var router = express.Router();
var {
  addFavs,
  getFavs,
  deleteFav,
  validateFav,
  getFavsServicesData,
} = require("../controllers/fav");

// http://localhost:3001/favs

// router.get('/', getFavs);
router.post("/", addFavs);
router.get("/:userId", getFavs);
router.get('/:userId/data', getFavsServicesData)
router.delete("/", deleteFav);
router.get("/", validateFav);

module.exports = router;
