const express = require("express");

// Controllers
const {
  register,
  login,
  logout,
  getMe,
} = require("../controllers/method/auth");
const { protect } = require("../middleware/auth");

// Express router
const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/me").get(protect, getMe);

module.exports = router;
