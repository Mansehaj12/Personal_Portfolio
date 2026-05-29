const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection state
let isMongoConnected = false;
const fallbackDbPath = path.join(__dirname, 'database_fallback.json');

// MongoDB Connection Attempt
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
console.log('Attempting connection to MongoDB at:', mongoUri);

mongoose.connect(mongoUri)
  .then(() => {
    console.log('⚡ Connected to MongoDB successfully.');
    isMongoConnected = true;
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB connection failed. Falling back to local file database (database_fallback.json).');
    console.log('Error details:', err.message);
    isMongoConnected = false;
  });

// Setup Message Schema for MongoDB if connected
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const MessageModel = mongoose.model('Message', messageSchema);

// Share DB state and models with router
app.use((req, res, next) => {
  req.db = {
    isMongoConnected,
    MessageModel,
    fallbackDbPath
  };
  next();
});

// Import API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Base route for sanity check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Futuristic Portfolio Backend API is up and running!',
    databaseMode: isMongoConnected ? 'MongoDB' : 'Local JSON Fallback'
  });
});

// Start Server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
    console.log(`Database Mode: ${isMongoConnected ? 'MongoDB' : 'JSON Fallback'}`);
  });
}

module.exports = app;

