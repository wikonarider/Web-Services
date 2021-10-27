var express = require('express');
var router = express.Router();
var { getServices, postServices, getServicesById, deleteServices } = require('../controllers/services');

// http://localhost:3001/services
router.get('/', getServices);
router.post('/', postServices);
router.get('/:id', getServicesById)
router.delete('/:id', deleteServices)
// router.post("/", )

module.exports = router;
