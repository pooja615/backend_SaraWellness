const jwt = require("jsonwebtoken");
const User = require("../models/models.user");

// ===== Helpers =====
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  });
};

const sendAuthResponse = (res, user, statusCode = 200) => {
  const token = signToken(user._id);

  return res.status(statusCode).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

// ===== Auth =====
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email, and password are required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password,
      role: "user",
    });

    // remove password if any
    const safeUser = await User.findById(user._id).select("-password");
    return sendAuthResponse(res, safeUser, 201);
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: "Email already in use" });
    }
    return res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    // Need password for compare
    const user = await User.findOne({ email: normalizedEmail }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const ok = await user.correctPassword(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const safeUser = await User.findById(user._id).select("-password");
    return sendAuthResponse(res, safeUser, 200);
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// ===== Admin: Users Management =====

// GET /api/users/admin/all  (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Failed to load users", error: error.message });
  }
};

// PATCH /api/users/admin/:id/role  (admin only) body: { role: "admin"|"user" }
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const nextRole = String(role || "").toLowerCase();
    if (!["admin", "user"].includes(nextRole)) {
      return res.status(400).json({ message: "role must be 'admin' or 'user'" });
    }

    // prevent admin removing their own admin role
    if (String(req.params.id) === String(req.user._id) && nextRole !== "admin") {
      return res.status(400).json({ message: "You cannot remove your own admin role." });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: nextRole },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "Role updated", user });
  } catch (error) {
    return res.status(500).json({ message: "Role update failed", error: error.message });
  }
};

// DELETE /api/users/admin/:id  (admin only)
exports.deleteUser = async (req, res) => {
  try {
    // prevent deleting yourself
    if (String(req.params.id) === String(req.user._id)) {
      return res.status(400).json({ message: "You cannot delete your own account." });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Delete failed", error: error.message });
  }
};
