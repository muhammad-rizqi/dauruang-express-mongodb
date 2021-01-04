const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const UserController = require("../controllers/userController");

const checkAuth = require("../middleware/check-auth");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/forgot-password", AuthController.forgot_password);
router.get("/profile", checkAuth, UserController.get_user_by_token);

module.exports = router;
