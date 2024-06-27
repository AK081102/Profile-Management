const mongoose = require('mongoose');
require('dotenv').config(); // Ensure this line is present to load the .env file

async function connectDB() {
    try {
        console.log('Connecting to MongoDB:', process.env.MONGODB_URI); // Log connection string for debugging
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected");
    } catch (err) {
        console.log("Error Mongoose", err);
    }
}

module.exports = connectDB;
