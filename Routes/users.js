const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { protect, restrictTo } = require("../middleware/auth");

// ===== Auth =====
router.post("/register", authController.register);
router.post("/login", authController.login);

// ===== Admin: Users management =====
router.get("/", protect, restrictTo("admin"), authController.getAllUsers);
router.patch("/:id", protect, restrictTo("admin"), authController.updateUserRole);
router.delete("/:id", protect, restrictTo("admin"), authController.deleteUser);

module.exports = router;
