const axios = require('axios');

async function testOSM() {
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
        console.log('Fetching OSM data...');
        const osmResponse = await axios.get(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
        console.log('Success! Items found:', osmResponse.data.elements.length);
    } catch (err) {
        console.error('OSM Error:', err.message);
        if (err.response) {
            console.error('Response data:', err.response.data);
        }
    }
}

testOSM();
