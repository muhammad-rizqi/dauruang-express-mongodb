const express = require("express");
const router = express.Router();
const SampahController = require("../controllers/sampahController");

router.get("/", SampahController.get_stok);

module.exports = router;
