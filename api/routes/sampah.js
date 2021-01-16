const express = require("express");
const router = express.Router();
const SampahController = require("../controllers/sampahController");

router.get("/", SampahController.get_sampah);
router.post("/", SampahController.add_sampah);
router.get("/:sampahId", SampahController.get_sampah_detail);
router.patch("/:sampahId", SampahController.update_sampah);
router.delete("/:sampahId", SampahController.delete_sampah);

module.exports = router;
