const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    hotelId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    guestIp: { type: String },
    username: { type: String, required: true },
    foodRating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    environmentRating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    rating: { type: Number, min: 1, max: 5 }, // Kept for backward compatibility
    bestItem: { type: String, default: '' },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

reviewSchema.pre('save', function(next) {
    if (this.foodRating && this.environmentRating) {
        this.rating = (this.foodRating + this.environmentRating) / 2;
    }
    next();
});

module.exports = mongoose.model('Review', reviewSchema);
