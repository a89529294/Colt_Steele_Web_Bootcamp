const express = require("express");
const router = express.Router();

router.use("/", (req, res, next) => {
  if (req.query.isAdmin) next();
  else res.send("Not an admin!!");
});

router.get("/topsecret", function (req, res) {
  res.send("this is top secret");
});
router.get("/deleteeverything", function (req, res) {
  res.send("DELETED THEM ALL");
});

module.exports = router;
