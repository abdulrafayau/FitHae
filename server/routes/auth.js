const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST api/auth/register
router.post('/register', async (req, res) => {
    const { username, fullName, email, contact, password, securityAnswer } = req.body;
    try {
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) return res.status(400).json({ message: 'User already exists with this email or username' });

        user = new User({ username, fullName, email, contact, password, securityAnswer });
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        
        await user.save();

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, username: user.username, fullName: user.fullName } });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth/login
router.post('/login', async (req, res) => {
    const { identifier, password } = req.body; // identifier can be email or username
    try {
        let user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, username: user.username, fullName: user.fullName, email: user.email, contact: user.contact, role: user.role } });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

const auth = require('../middleware/auth');

// @route   GET api/auth/me
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth/change-password
router.post('/change-password', auth, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user.id);
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect old password' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth/reset-password
router.post('/reset-password', async (req, res) => {
    const { identifier, securityAnswer, newPassword } = req.body;
    try {
        const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.securityAnswer !== securityAnswer) {
            return res.status(400).json({ message: 'Incorrect security answer' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        res.json({ message: 'Password reset successful' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route   GET api/auth/users
// @desc    Get all users (Admin only)
router.get('/users', auth, async (req, res) => {
    try {
        const admin = await User.findById(req.user.id);
        if (admin.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });

        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/auth/users/:id
// @desc    Delete a user (Admin only)
router.delete('/users/:id', auth, async (req, res) => {
    try {
        const admin = await User.findById(req.user.id);
        if (admin.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });

        if (req.params.id === req.user.id) return res.status(400).json({ message: 'Cannot delete yourself' });

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User removed' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
