const express = require("express");
const router = express.Router();
const TabunganController = require("../controllers/tabunganController");

router.get("/", TabunganController.get_setor);
router.post("/", TabunganController.add_setor);

module.exports = router;
