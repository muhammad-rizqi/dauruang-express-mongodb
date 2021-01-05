const express = require("express");
const router = express.Router();
const JualController = require("../controllers/jualController");

router.post("/", JualController.add_jual);
router.get("/", JualController.get_jual);
router.get("/:jualId", JualController.get_jual_by_id);
router.patch("/:jualId", JualController.update_jual);
router.delete("/:jualId", JualController.delete_jual);

module.exports = router;
