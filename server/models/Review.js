const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    hotelId: { type: String, required: true }, // OSM ID or Manual ID
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Null for guests
    guestIp: { type: String }, // For rate limiting guests
    username: { type: String, required: true }, // Display name (User's name or 'Guest')
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
