const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String },
    city: { type: String, enum: ['Islamabad', 'Rawalpindi'], required: true },
    source: { type: String, default: 'manual' }, // 'osm' or 'manual'
    osmId: { type: String },
    coordinates: {
        lat: { type: Number },
        lon: { type: Number }
    },
    isSponsored: { type: Boolean, default: false },
    sponsoredUntil: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hotel', hotelSchema);
