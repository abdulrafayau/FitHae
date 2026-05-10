const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    password: { type: String, required: true },
    securityQuestion: { type: String, default: 'Who do you love most?' },
    securityAnswer: { type: String, required: true },
    profilePicture: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
