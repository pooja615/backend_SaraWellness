const Contact = require('../models/models.contact');

// POST /
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'name, email, and message are required'
      });
    }

    const contact = await Contact.create({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : undefined,
      service,
      message: String(message).trim()
    });

    return res.status(201).json({
      message: 'Message sent successfully!',
      id: contact._id
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to send message',
      error: error.message
    });
  }
};

// GET / (admin only – protect with middleware)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact
      .find()
      .sort({ createdAt: -1 });

    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch contacts',
      error: error.message
    });
  }
};
