const mongoose = require('mongoose');
const Hotel = require('./models/Hotel'); // Restaurant model

const restaurants = [
    { name: "Monal Restaurant", city: "Islamabad", address: "Pir Sohawa Road, Margalla Hills", description: "Iconic hilltop dining with panoramic city views.", imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "Savour Foods", city: "Islamabad", address: "Blue Area, G-7", description: "Famous for authentic Pulao Kabab and traditional taste.", imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3", priceRange: "$", status: "approved" },
    { name: "Kabul Restaurant", city: "Islamabad", address: "F-7 Markaz, Jinnah Super", description: "Authentic Afghan cuisine featuring Kabuli Pulao and BBQ.", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3", priceRange: "$$", status: "approved" },
    { name: "Des Pardes", city: "Islamabad", address: "Saidpur Village", description: "Mughlai cuisine set in a historic, rustic village environment.", imageUrl: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "Tuscany Courtyard", city: "Islamabad", address: "F-6 Markaz", description: "Premium Italian dining with steaks and pastas.", imageUrl: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-4.0.3", priceRange: "$$$$", status: "approved" },
    { name: "Cheezious", city: "Islamabad", address: "F-11 Markaz", description: "Extremely popular for stuffed crust pizzas and fast food.", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3", priceRange: "$$", status: "approved" },
    { name: "Highland Country Club", city: "Islamabad", address: "Pir Sohawa", description: "Luxury dining in the mountains with a diverse menu.", imageUrl: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-4.0.3", priceRange: "$$$$", status: "approved" },
    { name: "Nando's", city: "Islamabad", address: "F-6 Super Market", description: "Afro-Portuguese chain famous for flame-grilled peri-peri chicken.", imageUrl: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "Street 1 Cafe", city: "Islamabad", address: "Kohsar Market, F-6", description: "Upscale cafe offering excellent breakfast and continental dishes.", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "Ginyaki", city: "Islamabad", address: "F-7 Markaz", description: "Make-your-own-bowl Pan-Asian cuisine.", imageUrl: "https://images.unsplash.com/photo-1569058242253-1df25022830f?ixlib=rb-4.0.3", priceRange: "$$", status: "approved" },
    { name: "Roasters Coffee House", city: "Islamabad", address: "F-7 Markaz", description: "Gourmet burgers and premium coffee blends.", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "Asian Wok", city: "Islamabad", address: "Beverly Centre, Blue Area", description: "High-end Chinese and Thai cuisine.", imageUrl: "https://images.unsplash.com/photo-1569058242253-1df25022830f?ixlib=rb-4.0.3", priceRange: "$$$$", status: "approved" },
    { name: "Howdy", city: "Islamabad", address: "F-7 Markaz", description: "Cowboy themed burger joint famous for Son of a Bun.", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3", priceRange: "$$", status: "approved" },
    { name: "Bao Bao", city: "Islamabad", address: "F-11 Markaz", description: "Authentic Pan-Asian dumplings and bao buns.", imageUrl: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3", priceRange: "$$", status: "approved" },
    { name: "Pappasallis", city: "Islamabad", address: "F-7 Markaz", description: "The oldest Italian restaurant in the city, known for deep pan pizzas.", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "Khiva", city: "Islamabad", address: "F-7 Markaz", description: "Traditional Pashtun, Afghan, and Mughlai dishes.", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "Mela", city: "Rawalpindi", address: "Bahria Town Phase 7", description: "A vibrant buffet experience with a mix of Desi and Continental.", imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "Bala Tikka House", city: "Rawalpindi", address: "Kartarpura", description: "Legendary street food spot for BBQ and Karahi.", imageUrl: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-4.0.3", priceRange: "$", status: "approved" },
    { name: "Texas Steakhouse", city: "Rawalpindi", address: "Saddar", description: "Premium steaks served sizzling hot.", imageUrl: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-4.0.3", priceRange: "$$$$", status: "approved" },
    { name: "Majeed Nihari", city: "Rawalpindi", address: "Commercial Market", description: "The most famous Nihari in Rawalpindi.", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3", priceRange: "$", status: "approved" },
    { name: "Diva", city: "Rawalpindi", address: "Jinnah Park", description: "Beautiful outdoor dining serving excellent continental.", imageUrl: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "Kallisto", city: "Rawalpindi", address: "Bahria Town Phase 7", description: "Multi-level terraced dining with amazing ambiance.", imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3", priceRange: "$$$$", status: "approved" },
    { name: "Tehzeeb Bakers", city: "Rawalpindi", address: "Saddar", description: "Iconic bakery famous for pizzas and salads.", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3", priceRange: "$", status: "approved" },
    { name: "Chikachino", city: "Islamabad", address: "F-7 Markaz", description: "High-end tea cafe with amazing paratha rolls.", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3", priceRange: "$$", status: "approved" },
    { name: "Quetta Tea N Teas", city: "Islamabad", address: "F-10 Markaz", description: "The definitive spot for Karak Chai and stuffed parathas.", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3", priceRange: "$", status: "approved" },
    { name: "Ox & Grill", city: "Islamabad", address: "F-7 Markaz", description: "Classic steakhouse known for massive portions.", imageUrl: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "CBTL", city: "Islamabad", address: "F-6 Markaz", description: "Coffee Bean & Tea Leaf, premium international coffee.", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "Shakespeare's Lounge", city: "Islamabad", address: "F-7 Markaz", description: "Literary themed cafe with excellent desserts.", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3", priceRange: "$$", status: "approved" },
    { name: "Atrio Cafe & Grill", city: "Islamabad", address: "F-7 Markaz", description: "Rooftop dining with a beautiful view of Margallas.", imageUrl: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "English Tea House", city: "Islamabad", address: "F-7 Markaz", description: "Victorian style high-tea and bakery.", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "Cannoli", city: "Islamabad", address: "Beverly Centre", description: "Gourmet burgers and artisanal desserts.", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "Burning Brownie", city: "Islamabad", address: "Beverly Centre", description: "The best cheesecakes and coffee in the capital.", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3", priceRange: "$$", status: "approved" },
    { name: "Mocca", city: "Islamabad", address: "Kohsar Market", description: "Minimalist Scandinavian cafe.", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "Suki Sushi", city: "Islamabad", address: "F-10 Markaz", description: "Authentic Korean and Japanese dining.", imageUrl: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "Mindanos", city: "Islamabad", address: "F-6 Markaz", description: "Modern fusion dining with a great ambiance.", imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "Kinyo", city: "Islamabad", address: "F-7 Markaz", description: "Contemporary Pan-Asian cuisine.", imageUrl: "https://images.unsplash.com/photo-1569058242253-1df25022830f?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "Brew", city: "Islamabad", address: "E-7", description: "Artisan coffee roasters and quiet workspace.", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3", priceRange: "$$", status: "approved" },
    { name: "Tandoori", city: "Islamabad", address: "F-10 Markaz", description: "Family friendly Pakistani cuisine.", imageUrl: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-4.0.3", priceRange: "$$", status: "approved" },
    { name: "Habibi", city: "Rawalpindi", address: "I-8 Markaz", description: "Famous for massive BBQ platters.", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3", priceRange: "$$", status: "approved" },
    { name: "Chikachino", city: "Rawalpindi", address: "Bahria Town", description: "Fast food and chai.", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3", priceRange: "$$", status: "approved" },
    { name: "Smokey Cauldron", city: "Islamabad", address: "F-6 Markaz", description: "Harry Potter themed cafe.", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3", priceRange: "$$", status: "approved" },
    { name: "1969 Time Goes On", city: "Islamabad", address: "Shakarparian", description: "Retro 60s themed restaurant nestled in greenery.", imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "Mantra", city: "Islamabad", address: "F-7 Markaz", description: "High-end French and Italian fusion.", imageUrl: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-4.0.3", priceRange: "$$$$", status: "approved" },
    { name: "Ranchers", city: "Islamabad", address: "I-8 Markaz", description: "Massive loaded burgers and wild west theme.", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3", priceRange: "$$", status: "approved" },
    { name: "Bismillah Tikka", city: "Rawalpindi", address: "Commercial Market", description: "Spicy BBQ and fresh naan.", imageUrl: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-4.0.3", priceRange: "$", status: "approved" },
    { name: "Roasters", city: "Rawalpindi", address: "Saddar", description: "Cozy coffee house and steaks.", imageUrl: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "Panda Ndag", city: "Islamabad", address: "F-10 Markaz", description: "Chinese street food style.", imageUrl: "https://images.unsplash.com/photo-1569058242253-1df25022830f?ixlib=rb-4.0.3", priceRange: "$$", status: "approved" },
    { name: "Wild Wings", city: "Islamabad", address: "F-11 Markaz", description: "Sports bar themed wing joint.", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3", priceRange: "$$", status: "approved" },
    { name: "Bar B Q Tonight", city: "Islamabad", address: "Blue Area", description: "The standard for premium Pakistani BBQ.", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3", priceRange: "$$$", status: "approved" },
    { name: "Bao", city: "Islamabad", address: "E-7", description: "Fine dining Asian.", imageUrl: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3", priceRange: "$$$$", status: "approved" }
];

mongoose.connect('mongodb://localhost:27017/hotelreview').then(async () => {
    try {
        console.log('Clearing existing hotels to insert massive seed...');
        await Hotel.deleteMany({});
        
        console.log(`Inserting ${restaurants.length} premium dining spots...`);
        await Hotel.insertMany(restaurants);
        
        console.log('Seed complete!');
    } catch (err) {
        console.error('Error seeding:', err);
    } finally {
        process.exit();
    }
});
