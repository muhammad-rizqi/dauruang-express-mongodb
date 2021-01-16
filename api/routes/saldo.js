const express = require("express");
const router = express.Router();
const TabunganController = require("../controllers/tabunganController");

router.get("/:userId", TabunganController.get_saldo_by_user);

module.exports = router;
