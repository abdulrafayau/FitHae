const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const auth = require('../middleware/auth'); // I'll create this middleware next

// @route   GET api/reviews/:hotelId
// @desc    Get reviews for a specific hotel
router.get('/:hotelId', async (req, res) => {
    try {
        const reviews = await Review.find({ hotelId: req.params.hotelId }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching reviews' });
    }
});

// @route   POST api/reviews
// @desc    Add a review (Guest or User)
router.post('/', async (req, res) => {
    const { hotelId, username, rating, comment, userId } = req.body;
    const clientIp = req.clientIp; // From request-ip middleware

    try {
        // Check 24 hour limit
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        
        let query = { hotelId, createdAt: { $gte: oneDayAgo } };
        
        if (userId) {
            query.userId = userId;
        } else {
            query.guestIp = clientIp;
            query.userId = null;
        }

        const existingReview = await Review.findOne(query);

        if (existingReview) {
            return res.status(429).json({ 
                message: 'You have already reviewed this hotel in the last 24 hours. Please wait before posting again.' 
            });
        }

        const newReview = new Review({
            hotelId,
            userId: userId || null,
            guestIp: userId ? null : clientIp,
            username: username || 'Guest',
            rating,
            comment
        });

        await newReview.save();
        res.json(newReview);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error posting review' });
    }
});

module.exports = router;
