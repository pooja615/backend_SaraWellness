const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true,
    enum: ['weight-loss', 'hair-loss', 'skin-care', 'stress-management', 'pain-relief', 'personal-problems']
  },
  preferredDate: {
    type: Date,
    required: true
  },
  message: {
    type: String
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'confirmed', 'cancelled', 'completed']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);