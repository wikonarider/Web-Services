var express = require("express");
var router = express.Router();
const {
  getMermers,
  sendMessage,
  getConvertations,
  getPots,
  getContacts,
  deleteConvertation,
  newConvertation,
  getContactsbought,
} = require("../controllers/chat");
const { verifyToken } = require("../controllers/authentication");


router.post("/",  sendMessage);
router.get("/convertations",  getConvertations);
router.post("/convertations/:id",  newConvertation);
router.delete("/convertations/:id",  deleteConvertation);
router.get("/posts",  getPots);
router.get("/contacts",  getContacts);
router.get("/contactsBougth", getContactsbought);

module.exports = router;
