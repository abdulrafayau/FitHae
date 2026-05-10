const express = require('express');
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');

// @route   GET api/hotels
// @desc    Get all hotels from Islamabad and Rawalpindi (OSM + Manual)
router.get('/', async (req, res) => {
    try {
        const query = `
            [out:json];
            (
                area["name"="Islamabad"]->.a;
                node["tourism"="hotel"](area.a);
                way["tourism"="hotel"](area.a);
                
                area["name"="Rawalpindi District"]->.b;
                node["tourism"="hotel"](area.b);
                way["tourism"="hotel"](area.b);
            );
            out body;
        `;
        
        const osmResponse = await axios.get(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
        
        const osmHotels = osmResponse.data.elements.map(el => ({
            id: el.id.toString(),
            name: el.tags.name || 'Unnamed Hotel',
            address: el.tags['addr:street'] || el.tags['addr:full'] || 'Address not available',
            city: el.tags['addr:city'] || (el.lat > 33.6 ? 'Islamabad' : 'Rawalpindi'),
            source: 'osm',
            coordinates: {
                lat: el.lat || (el.center ? el.center.lat : null),
                lon: el.lon || (el.center ? el.center.lon : null)
            }
        }));

        const manualHotels = await Hotel.find();
        
        const now = new Date();
        const formattedManual = manualHotels.map(h => ({
            id: h._id,
            name: h.name,
            address: h.address,
            city: h.city,
            source: 'manual',
            coordinates: h.coordinates,
            isSponsored: h.isSponsored && h.sponsoredUntil && h.sponsoredUntil > now,
            sponsoredUntil: h.sponsoredUntil
        }));

        const allHotels = [...osmHotels, ...formattedManual];
        
        // Sort: Sponsored first, then by name
        allHotels.sort((a, b) => {
            if (a.isSponsored === b.isSponsored) {
                return a.name.localeCompare(b.name);
            }
            return a.isSponsored ? -1 : 1;
        });

        res.json(allHotels);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error fetching hotels' });
    }
});

// @route   PATCH api/hotels/:id/sponsor
// @desc    Set hotel as sponsored for a duration (in days)
router.patch('/:id/sponsor', async (req, res) => {
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

// @route   POST api/hotels
// @desc    Add a manual hotel
router.post('/', async (req, res) => {
    const { name, address, city, lat, lon } = req.body;
    try {
        const newHotel = new Hotel({
            name,
            address,
            city,
            coordinates: { lat, lon }
        });
        await newHotel.save();
        res.json(newHotel);
    } catch (err) {
        res.status(500).json({ message: 'Error adding hotel' });
    }
});

// @route   GET api/hotels/:id
// @desc    Get hotel by ID
router.get('/:id', async (req, res) => {
    try {
        // Try manual DB first
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const hotel = await Hotel.findById(req.params.id);
            if (hotel) {
                const now = new Date();
                return res.json({
                    ...hotel.toObject(),
                    id: hotel._id,
                    isSponsored: hotel.isSponsored && hotel.sponsoredUntil && hotel.sponsoredUntil > now
                });
            }
        }

        // Try OSM (assuming ID is numeric or from Overpass)
        const osmId = req.params.id;
        // Simplified: In a real app, you'd query Overpass specifically for this ID
        // For now, we'll return a placeholder or re-query if it's a known OSM ID format
        res.json({
            id: osmId,
            name: 'Serena Hotel Islamabad', // Fallback/Mock for OSM detail if not found
            address: 'Khayaban-e-Suhrwardy, Islamabad',
            city: 'Islamabad',
            rating: 9.8,
            source: 'osm'
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching hotel details' });
    }
});

module.exports = router;
