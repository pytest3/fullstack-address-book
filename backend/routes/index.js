var express = require("express");
var router = express.Router();
const controllers = require("../controllers");

const { contactController } = controllers;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("hello homepage");
});

/* Contact router */
router.get("/api/contacts", contactController.findAll);
router.post("/api/contacts", contactController.add);
router.get("/api/contacts/:first_name", contactController.findOne);
router.delete("/api/contacts", contactController.findOne);

module.exports = router;
