const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// @route   GET api/users/profile
// @desc    Get current user profile and reviews
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const reviews = await Review.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json({ user, reviews });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
