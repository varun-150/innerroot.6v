/**
 * InnerRoots MongoDB Initialization Script
 * 
 * Usage: mongosh "mongodb://localhost:27017/69954a6a8176a01ac5ea8980" init-mongodb.js
 */

const dbName = '69954a6a8176a01ac5ea8980';
const db = db.getSiblingDB(dbName);

// 1. Create Collections (Collections are created automatically on insert, but we can pre-create them if needed)
const collections = [
    'wisdom_quotes',
    'culture_items',
    'heritage_sites',
    'library_items',
    'community_posts',
    'users',
    'guides',
    'events',
    'wellness_content',
    'mood_entries'
];

collections.forEach(col => {
    if (!db.getCollectionNames().includes(col)) {
        db.createCollection(col);
        print(`Created collection: ${col}`);
    } else {
        print(`Collection already exists: ${col}`);
    }
});

// 2. Clear existing seed data (optional, remove if you want to keep existing data)
// db.wisdom_quotes.deleteMany({});
// db.culture_items.deleteMany({});
// ...

// 3. Seed initial data (Sample data based on DataSeeder)
if (db.wisdom_quotes.countDocuments() === 0) {
    db.wisdom_quotes.insertMany([
        {
            quote: "You have the right to work, but never to the fruit of work.",
            source: "Bhagavad Gita 2.47",
            theme: "Karma"
        },
        {
            quote: "The mind acts like an enemy for those who do not control it.",
            source: "Bhagavad Gita 6.6",
            theme: "Mind"
        },
        {
            quote: "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.",
            source: "Bhagavad Gita 6.19",
            theme: "Meditation"
        }
    ]);
    print("Seeded wisdom_quotes");
}

if (db.culture_items.countDocuments() === 0) {
    db.culture_items.insertMany([
        {
            title: "Diwali - Festival of Lights",
            category: "festivals",
            description: "The most celebrated festival symbolizing the victory of light over darkness.",
            image: "heritage-gold"
        },
        {
            title: "Bharatanatyam",
            category: "arts",
            description: "One of the oldest classical dance forms originating from Tamil Nadu.",
            image: "heritage-teal"
        },
        {
            title: "The Rigveda",
            category: "scriptures",
            description: "The oldest known Vedic Sanskrit text, composed around 1500 BCE.",
            image: "heritage-green"
        }
    ]);
    print("Seeded culture_items");
}

if (db.heritage_sites.countDocuments() === 0) {
    db.heritage_sites.insertMany([
        {
            name: "Taj Mahal",
            location: "Agra, Uttar Pradesh",
            description: "The iconic symbol of eternal love and Mughal architecture.",
            rating: 4.9,
            reviews: 2847
        },
        {
            name: "Varanasi Ghats",
            location: "Varanasi, Uttar Pradesh",
            description: "The spiritual heart of India on the banks of the sacred Ganges.",
            rating: 4.8,
            reviews: 1956
        }
    ]);
    print("Seeded heritage_sites");
}

print("MongoDB initialization complete!");
