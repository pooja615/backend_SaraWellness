const express = require("express");
const router = express.Router();

const testimonialController = require("../controllers/testimonialController");
const { uploadTestimonialImage } = require("../middleware/uploadTestimonial");
const { protect, restrictTo } = require("../middleware/auth");

// Public: approved only
router.get("/", testimonialController.getApprovedTestimonials);

// ✅ User: ONLY my testimonials
router.get(
  "/me",
  protect,
  restrictTo("user"),
  testimonialController.getMyTestimonials
);

// User submit (pending approval)
router.post(
  "/",
  protect,
  restrictTo("user"),
  uploadTestimonialImage.single("image"),
  testimonialController.createTestimonial
);

// Admin: all testimonials
router.get(
  "/admin/all",
  protect,
  restrictTo("admin"),
  testimonialController.getAllTestimonialsAdmin
);

// Admin: approve
router.patch(
  "/:id/approve",
  protect,
  restrictTo("admin"),
  testimonialController.approveTestimonial
);

// Admin: edit (name, service, content, rating, approved)
router.patch(
  "/:id",
  protect,
  restrictTo("admin"),
  testimonialController.updateTestimonialAdmin
);

// Admin: delete
router.delete(
  "/:id",
  protect,
  restrictTo("admin"),
  testimonialController.deleteTestimonialAdmin
);

module.exports = router;
