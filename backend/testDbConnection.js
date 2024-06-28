const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const DB_URI = process.env.MONGO_URI;

mongoose.connect(DB_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
