const mongoose = require('mongoose');
require('dotenv').config()

// Define the mongoDB url connection

// local database URL
// const mongoURL = MONGODB_URL_LOCAL; // replace 'hotel' with your database name

// atlas database URL
const mongoURL = process.env.MONGODB_URL

// setup mongodb connection
mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    
    // useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintain a default connection object represeting the mongoDB connection
const db = mongoose.connection;

// define eventListeners for database connection
db.on('connected', () => {
    console.log('MongoDB server connected successfully');
});
db.on('error', (err) => {
    console.error('MongoDB connection error: ' + err);
});
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// export the connection
module.exports = db 