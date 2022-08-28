const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("ALL SHELTERS");
});
router.post("/", function (req, res) {
  res.send("CREATING A SHELTER");
});
router.get("/:id", function (req, res) {
  res.send("VIEWING ONE SHELTER");
});
router.get("/:id/edit", function (req, res) {
  res.send("EDITING ONE SHELTER");
});

module.exports = router;
