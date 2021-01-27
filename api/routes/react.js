const express = require("express");
const router = express.Router();
const path = require("path");

const react = (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
};

router.get("/*", react);

module.exports = router;
