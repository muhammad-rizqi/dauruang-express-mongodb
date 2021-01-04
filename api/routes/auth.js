const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/forgot-password", AuthController.forgot_password);

module.exports = router;
