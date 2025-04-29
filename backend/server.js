const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); // Import fs module
const reportRoutes = require('./routes/reportRoutes');
require('dotenv').config();

const app = express();

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads)
app.use('/uploads', express.static(uploadsDir));

// Use the routes
app.use('/api', reportRoutes);

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
