const Appointment = require('../models/appointment');

// POST /
exports.createAppointment = async (req, res) => {
    try {
        const { name, email, phone, service, date, message } = req.body;

        // Basic validation
        if (!name || !email || !service || !date) {
            return res.status(400).json({
                message: 'name, email, service, and date are required'
            });
        }

        const appointment = await Appointment.create({
            name: String(name).trim(),
            email: String(email).trim().toLowerCase(),
            phone: phone ? String(phone).trim() : undefined,
            service,
            date,
            message: message ? String(message).trim() : undefined
        });

        return res.status(201).json({
            message: 'Appointment booked successfully!',
            id: appointment._id
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to book appointment',
            error: error.message
        });
    }
};
