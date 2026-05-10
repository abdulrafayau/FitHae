const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');
const auth = require('../middleware/auth');

// @route   GET api/hotels
// @desc    Get all hotels from DB (Manual entries)
router.get('/', async (req, res) => {
    try {
        const { city, search, status } = req.query;
        let query = { status: status || 'approved' }; // default to approved
        
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
// @desc    Register a new hotel (User suggests or Admin adds)
router.post('/', auth, async (req, res) => {
    const { name, description, address, city, imageUrl, lat, lon, amenities, priceRange } = req.body;
    try {
        const user = await mongoose.model('User').findById(req.user.id);
        const status = user.role === 'admin' ? 'approved' : 'pending';

        const newHotel = new Hotel({
            name,
            description,
            address,
            city,
            imageUrl,
            coordinates: { lat, lon },
            amenities,
            priceRange,
            status
        });
        await newHotel.save();
        res.json(newHotel);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering hotel' });
    }
});

// @route   DELETE api/hotels/:id
// @desc    Delete a hotel
router.delete('/:id', auth, async (req, res) => {
    try {
        const user = await mongoose.model('User').findById(req.user.id);
        if (user.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });

        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
        
        // Also delete associated reviews
        await mongoose.model('Review').deleteMany({ hotelId: req.params.id });

        res.json({ message: 'Hotel removed' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting hotel' });
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

// @route   PATCH api/hotels/:id/unsponsor
router.patch('/:id/unsponsor', auth, async (req, res) => {
    try {
        const user = await mongoose.model('User').findById(req.user.id);
        if (user.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });

        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

        hotel.isSponsored = false;
        hotel.sponsoredUntil = null;
        await hotel.save();

        res.json(hotel);
    } catch (err) {
        res.status(500).json({ message: 'Error removing sponsorship' });
    }
});

// @route   PATCH api/hotels/:id/approve
router.patch('/:id/approve', auth, async (req, res) => {
    try {
        const user = await mongoose.model('User').findById(req.user.id);
        if (user.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });

        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

        hotel.status = 'approved';
        await hotel.save();

        res.json(hotel);
    } catch (err) {
        res.status(500).json({ message: 'Error approving hotel' });
    }
});

module.exports = router;
