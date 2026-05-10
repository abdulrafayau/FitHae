const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: 'A premium stay experience in the heart of the city.' },
    imageUrl: { type: String, default: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3' },
    address: { type: String, required: true },
    city: { type: String, required: true },
    coordinates: {
        lat: { type: Number, default: 33.6844 },
        lon: { type: Number, default: 73.0479 }
    },
    amenities: [{ type: String }],
    isSponsored: { type: Boolean, default: false },
    sponsoredUntil: { type: Date },
    rating: { type: Number, default: 4.5 },
    priceRange: { type: String, default: '$$$' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hotel', hotelSchema);
