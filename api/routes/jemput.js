const express = require("express");
const router = express.Router();
const JemputController = require("../controllers/jemputController");

router.get("/", JemputController.get_jemput);
router.post("/", JemputController.add_jemput);
router.patch("/:jemputId", JemputController.update_jemput);

module.exports = router;
