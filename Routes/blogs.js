const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogController");
const { uploadBlogImage } = require("../middleware/uploadBlog");

// ✅ Auth middleware
const { protect, restrictTo } = require("../middleware/auth");

// -------------------------
// PUBLIC ROUTES
// -------------------------
router.get("/", blogController.getPublishedBlogs);

// IMPORTANT: admin/all must come BEFORE "/:id"
router.get("/admin/all", protect, restrictTo("admin"), blogController.getAllBlogsAdmin);

// Public can view only published blog by id
// Admin can view any blog by id
router.get("/:id", blogController.getSingleBlog);

// -------------------------
// ADMIN ROUTES
// -------------------------
router.post(
  "/",
  protect,
  restrictTo("admin"),
  uploadBlogImage.single("image"),
  blogController.createBlog
);

router.patch(
  "/:id",
  protect,
  restrictTo("admin"),
  uploadBlogImage.single("image"),
  blogController.updateBlog
);
router.put(
  "/:id",
  protect,
  restrictTo("admin"),
  uploadBlogImage.single("image"),
  blogController.updateBlog
);

router.delete(
  "/:id",
  protect,
  restrictTo("admin"),
  blogController.deleteBlog
);

module.exports = router;
