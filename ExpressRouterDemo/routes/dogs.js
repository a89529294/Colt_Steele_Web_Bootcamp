const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("ALL DOGS");
});

router.get("/:id", function (req, res) {
  res.send("VIEWING ONE DOG");
});
router.get("/:id/edit", function (req, res) {
  res.send("EDITING ONE DOG");
});

module.exports = router;
