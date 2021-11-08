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
} = require("../controllers/chat");


router.post("/", sendMessage);
router.get("/convertations", getConvertations);
router.post("/convertations/:id", newConvertation);
router.delete("/convertations/:id", deleteConvertation);
router.get("/posts", getPots);
router.get("/contacts", getContacts);

module.exports = router;
