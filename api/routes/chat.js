const express = require("express");
const router = express.Router();
const ChatController = require("../controllers/chatController");

router.post("/:from/messages", ChatController.get_chat_messages);
router.post("/:from", ChatController.send_chat);
router.get("/:userId", ChatController.get_chat_user);
// router.delete("/:userId", UserController.delete_user);

module.exports = router;
