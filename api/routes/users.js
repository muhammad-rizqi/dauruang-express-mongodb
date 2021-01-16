const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const JemputController = require("../controllers/jemputController");
const TabunganController = require("../controllers/tabunganController");

const upload = require("../utils/multerUtilities");

router.get("/", UserController.get_all_user);
router.get("/:userId", UserController.get_user_by_id);
router.patch("/:userId", UserController.update_user);
router.delete("/:userId", UserController.delete_user);
router.patch(
  "/:userId/avatar",
  upload.single("avatar"),
  UserController.update_avatar
);
router.patch("/:userId/password", UserController.change_password);

router.get("/:userId/penyetoran", TabunganController.get_setor_by_user);
router.get("/:userId/penarikan", TabunganController.get_tarik_by_user);
router.get("/:userId/penjemputan", JemputController.get_jemput_by_user);

module.exports = router;
