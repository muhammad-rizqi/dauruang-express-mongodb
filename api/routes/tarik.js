const express = require("express");
const router = express.Router();
const TabunganController = require("../controllers/tabunganController");

router.post("/", TabunganController.tarik);

module.exports = router;
