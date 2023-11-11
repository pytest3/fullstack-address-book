var express = require("express");
var router = express.Router();
const controllers = require("../controllers");

const { contactController } = controllers;

/* GET home page. */
router.get("/", function (req, res, next) {
  return res.send("hello homepage");
});

/* Contact router */
router.get("/api/contacts", contactController.findAll);
router.post("/api/contacts", contactController.add);
router.put("/api/contacts/:userId", contactController.updateAll);
router.get("/api/contacts/:first_name", contactController.findByName);
router.delete("/api/contacts/delete-all", contactController.deleteAll);
router.delete("/api/contacts/:userId", contactController.deleteOne);

// router.get("/api/test", contactController.testQuery);

module.exports = router;
