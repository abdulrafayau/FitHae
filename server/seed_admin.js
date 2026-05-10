const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/hotelreview').then(async () => {
    try {
        const username = '@admin';
        const password = 'admin@rafaysinansattar';

        let adminUser = await User.findOne({ username });
        if (adminUser) {
            console.log('Admin already exists. Updating password and role...');
            const salt = await bcrypt.genSalt(10);
            adminUser.password = await bcrypt.hash(password, salt);
            adminUser.role = 'admin';
            await adminUser.save();
            console.log('Admin updated successfully.');
        } else {
            console.log('Creating new admin user...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            adminUser = new User({
                username: username,
                fullName: 'Super Admin',
                email: 'admin@fithae.pk',
                contact: '00000000000',
                password: hashedPassword,
                securityAnswer: 'FitHae',
                role: 'admin'
            });
            await adminUser.save();
            console.log('Admin created successfully.');
        }
    } catch (err) {
        console.error('Error seeding admin:', err);
    } finally {
        process.exit();
    }
});
