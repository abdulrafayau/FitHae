const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');
const auth = require('../middleware/auth');

// @route   GET api/hotels
// @desc    Get all hotels from DB (Manual entries)
router.get('/', async (req, res) => {
    try {
        const { city, search } = req.query;
        let query = {};
        
        if (city) query.city = new RegExp(city, 'i');
        if (search) query.name = new RegExp(search, 'i');

        const hotels = await Hotel.find(query).sort({ isSponsored: -1, rating: -1 });
        res.json(hotels);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error fetching hotels' });
    }
});

// @route   GET api/hotels/:id
router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Hotel ID' });
        }
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
        res.json(hotel);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching hotel details' });
    }
});

// @route   POST api/hotels
// @desc    Register a new hotel (Manual Entry)
router.post('/', async (req, res) => {
    const { name, description, address, city, imageUrl, lat, lon, amenities, priceRange } = req.body;
    try {
        const newHotel = new Hotel({
            name,
            description,
            address,
            city,
            imageUrl,
            coordinates: { lat, lon },
            amenities,
            priceRange
        });
        await newHotel.save();
        res.json(newHotel);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering hotel' });
    }
});

// @route   PATCH api/hotels/:id/sponsor
router.patch('/:id/sponsor', auth, async (req, res) => {
    const { days } = req.body;
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

        const expiry = new Date();
        expiry.setDate(expiry.getDate() + parseInt(days));

        hotel.isSponsored = true;
        hotel.sponsoredUntil = expiry;
        await hotel.save();

        res.json(hotel);
    } catch (err) {
        res.status(500).json({ message: 'Error updating sponsorship' });
    }
});

module.exports = router;
