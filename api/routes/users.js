const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
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
module.exports = router;
