require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const requestIp = require('request-ip');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestIp.mw());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hotelreview')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/hotels', require('./routes/hotels'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/users', require('./routes/users'));

app.get('/', (req, res) => {
    res.send('Hotel Review API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
