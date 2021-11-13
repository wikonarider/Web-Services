var express = require('express');
var router = express.Router();
var {
  getServices,
  postServices,
  getServicesById,
  getServicesByUserId,
  getServicesByIds,
  putService,
  deleteServices,
} = require('../controllers/services');
const { verifyToken } = require('../controllers/authentication');

// get Services
router.get('/', getServices);
router.get('/', getServicesByUserId);
router.get('/', getServicesByIds);
router.get('/:id', getServicesById);

// post Services
router.post('/', verifyToken, postServices);

// put Services
router.put('/', verifyToken, putService);
// delete Services
router.delete('/:id', deleteServices);

module.exports = router;
