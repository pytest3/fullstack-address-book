var express = require("express");
var router = express.Router(); // gets an instance of express router
const controllers = require("../controllers");

const { contactController } = controllers;

/* GET home page. */
router.get("/", function (req, res, next) {
  return res.send("hello homepage");
});

/* Contact router */
router.get("/api/contacts", contactController.findAll);
router.post("/api/contacts", contactController.addOne);
router.put("/api/contacts/:userId", contactController.updateAll);
router.delete("/api/contacts", contactController.deleteContact);

router.get("/api/contacts/:id", contactController.findById);
router.delete("/api/contacts/delete-all", contactController.deleteAll);

/*Unused*/
// router.delete("/api/contacts", contactController.deleteContact);
// router.get("/api/contacts/:first_name", contactController.findByName);
// router.get("/api/test", contactController.testQuery);

module.exports = router;
