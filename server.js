const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

/**
 * -------------------------
 * Middleware
 * -------------------------
 */

// CORS (adjust origin for production)
app.use(
  cors({
    origin: '*', // change to your frontend URL in production (e.g. "https://sarawellness.com")
    credentials: false
  })
);

// Built-in body parsing (no need for body-parser)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/**
 * -------------------------
 * Static Files
 * -------------------------
 * Serve uploaded images: http://localhost:5000/uploads/...
 */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/**
 * -------------------------
 * MongoDB Connection
 * -------------------------
 */
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sara_wellness';

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

/**
 * -------------------------
 * Routes
 * -------------------------
 * IMPORTANT:
 * Use consistent folder naming: use "./routes/..." (lowercase) everywhere.
 * On Linux hosting, "./Routes" vs "./routes" is a real bug.
 */
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Sara Wellness API is running!' });
});

// API routes
app.use('/api/appointments', require('./Routes/appointments'));
app.use('/api/contacts', require('./Routes/contacts'));
app.use('/api/users', require('./Routes/users')); // register/login
app.use('/api/blog', require('./Routes/blogs'));
app.use('/api/testimonials', require('./Routes/testimonials'));
// static files
app.use("/uploads", express.static("uploads"));


/**
 * -------------------------
 * 404 Handler
 * -------------------------
 */
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

/**
 * -------------------------
 * Error Handler
 * -------------------------
 */
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err);

  // Multer file upload errors often come here
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || 'Something went wrong!'
  });
});

/**
 * -------------------------
 * Server Start
 * -------------------------
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
