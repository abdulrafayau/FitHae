const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// @route   GET api/reviews/leaderboard
// @desc    Get top reviewers
router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await Review.aggregate([
            { $match: { userId: { $ne: null } } },
            { $group: { _id: "$userId", username: { $first: "$username" }, reviewCount: { $sum: 1 } } },
            { $sort: { reviewCount: -1 } },
            { $limit: 10 }
        ]);
        res.json(leaderboard);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

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
    const { hotelId, username, foodRating, environmentRating, comment, userId, bestItem } = req.body;
    const clientIp = req.clientIp || req.ip;

    try {
        // 24 hour limit check
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        let query = { hotelId, createdAt: { $gte: oneDayAgo } };
        
        if (userId) {
            query.userId = userId;
        } else {
            query.guestIp = clientIp;
        }

        const existingReview = await Review.findOne(query);
        if (existingReview) {
            return res.status(429).json({ message: 'Only one review per 24 hours is allowed.' });
        }

        const newReview = new Review({
            hotelId,
            userId: userId || null,
            guestIp: userId ? null : clientIp,
            username: username || 'Guest',
            foodRating: foodRating || 5,
            environmentRating: environmentRating || 5,
            bestItem: bestItem || '',
            comment
        });

        await newReview.save();
        res.json(newReview);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error posting review' });
    }
});

// @route   GET api/reviews/all
// @desc    Get all reviews (Admin only)
router.get('/all', auth, async (req, res) => {
    try {
        const user = await mongoose.model('User').findById(req.user.id);
        if (user.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });

        const reviews = await Review.find().sort({ createdAt: -1 }).populate('hotelId', 'name');
        res.json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching all reviews' });
    }
});

// @route   DELETE api/reviews/:id
// @desc    Delete a review (Admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const user = await mongoose.model('User').findById(req.user.id);
        if (user.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });

        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        res.json({ message: 'Review deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting review' });
    }
});

module.exports = router;
