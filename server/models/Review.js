const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    hotelId: { type: String, required: true }, // Store as string to handle legacy or new IDs
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    guestIp: { type: String },
    username: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
