var express = require('express');
var router = express.Router();
var { addFavs, getFavs } = require('../controllers/fav');

// http://localhost:3001/favs

// router.get('/', getFavs);
router.post('/', addFavs);
router.get('/:idUser', getFavs);

module.exports = router;