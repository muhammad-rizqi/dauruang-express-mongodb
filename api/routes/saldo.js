const express = require("express");
const router = express.Router();
const TabunganController = require("../controllers/tabunganController");

router.get("/", TabunganController.get_tabungan_list);
router.get("/:userId", TabunganController.get_saldo_user);

module.exports = router;
