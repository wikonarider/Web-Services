var express = require("express");
var router = express.Router();
var {
  getServices,
  postServices,
  getServicesById,
  getServicesByUserId,
  putServiceById,
  deleteServices,
} = require("../controllers/services");
const { isAuthenticated } = require("../controllers/authentication");

// get Services
router.get("/", getServices);
router.get("/", getServicesByUserId);
router.get("/:id", getServicesById);

// post Services
router.post("/", isAuthenticated, postServices);

// put Services
router.put("/", putServiceById); //colocar isAuthenticated
// delete Services
router.delete("/:id", deleteServices);

module.exports = router;
