const Testimonial = require("../models/testimonial");

// Public: approved testimonials only
exports.getApprovedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true })
      .sort({ createdAt: -1 });

    res.status(200).json(testimonials);
  } catch (err) {
    res.status(500).json({ message: "Failed to load testimonials", error: err.message });
  }
};

// User: get ONLY my testimonials
exports.getMyTestimonials = async (req, res) => {
  try {
    const myTestimonials = await Testimonial.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json(myTestimonials);
  } catch (err) {
    res.status(500).json({ message: "Failed to load your testimonials", error: err.message });
  }
};

// User: create testimonial (pending approval)
// IMPORTANT: name and user are taken from req.user
exports.createTestimonial = async (req, res) => {
  try {
    const { service, content, rating } = req.body;

    if (!service || !content || !rating) {
      return res.status(400).json({ message: "service, content and rating are required" });
    }

    const testimonial = await Testimonial.create({
      user: req.user._id,
      name: req.user.name,     // always from user
      service,
      content,
      rating: Number(rating),
      image: req.file ? req.file.path : undefined,
      approved: false
    });

    res.status(201).json({ message: "Testimonial submitted, pending approval", testimonial });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit testimonial", error: err.message });
  }
};

// Admin: all testimonials
exports.getAllTestimonialsAdmin = async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(testimonials);
  } catch (err) {
    res.status(500).json({ message: "Failed to load testimonials", error: err.message });
  }
};

// Admin: approve
exports.approveTestimonial = async (req, res) => {
  try {
    const t = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    if (!t) return res.status(404).json({ message: "Testimonial not found" });

    res.status(200).json({ message: "Approved", testimonial: t });
  } catch (err) {
    res.status(500).json({ message: "Approve failed", error: err.message });
  }
};

// Admin: update fields
exports.updateTestimonialAdmin = async (req, res) => {
  try {
    const allowed = ["name", "service", "content", "rating", "approved"];
    const updates = {};

    for (const k of allowed) {
      if (req.body[k] !== undefined) updates[k] = req.body[k];
    }
    if (updates.rating !== undefined) updates.rating = Number(updates.rating);

    const t = await Testimonial.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!t) return res.status(404).json({ message: "Testimonial not found" });

    res.status(200).json({ message: "Updated", testimonial: t });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Admin: delete
exports.deleteTestimonialAdmin = async (req, res) => {
  try {
    const t = await Testimonial.findByIdAndDelete(req.params.id);
    if (!t) return res.status(404).json({ message: "Testimonial not found" });

    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
