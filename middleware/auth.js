const jwt = require("jsonwebtoken");
const User = require("../models/models.user");

/**
 * protect
 * - Requires Authorization: Bearer <token>
 * - Verifies token, loads user, attaches req.user
 */
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Expect: Authorization: Bearer <token>
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "You are not logged in. Please provide a token.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If user deleted, token is invalid
    const currentUser = await User.findById(decoded.id).select("-password");
    if (!currentUser) {
      return res.status(401).json({
        message: "The user belonging to this token no longer exists.",
      });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error: err.message,
    });
  }
};

/**
 * restrictTo
 * Example: restrictTo("admin") or restrictTo("admin","user")
 */
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    const userRole = (req.user?.role || "").toLowerCase();
    const allowed = roles.map((r) => String(r).toLowerCase());

    if (!allowed.includes(userRole)) {
      return res.status(403).json({
        message: "You do not have permission to perform this action.",
      });
    }

    next();
  };
};
