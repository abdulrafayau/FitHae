const axios = require('axios');

async function testFlow() {
    const api = 'http://localhost:5001/api';
    
    try {
        console.log('--- Testing Hotels Fetch ---');
        const hotelsRes = await axios.get(`${api}/hotels`);
        console.log('Hotels count:', hotelsRes.data.length);

        console.log('\n--- Testing Registration ---');
        const signupData = {
            username: `tester_${Date.now()}`,
            fullName: 'Test User',
            email: `test_${Date.now()}@test.com`,
            contact: '123456789',
            password: 'password123',
            securityAnswer: 'test_answer'
        };
        const regRes = await axios.post(`${api}/auth/register`, signupData);
        console.log('Registration Success:', regRes.data.user.username);
        
        console.log('\n--- Testing Profile Fetch (Authenticated) ---');
        const profileRes = await axios.get(`${api}/auth/me`, {
            headers: { 'x-auth-token': regRes.data.token }
        });
        console.log('Profile details:', profileRes.data.fullName, profileRes.data.email);

    } catch (err) {
        console.error('Test Failed:', err.response ? err.response.data : err.message);
    }
}

testFlow();
