var express = require('express');
var router = express.Router();
var { getServices, postServices, getServicesById } = require('../controllers/services');

// http://localhost:3001/services
router.get('/', getServices);
router.post('/', postServices);
router.get('/:id', getServicesById)
// router.post("/", )

module.exports = router;
