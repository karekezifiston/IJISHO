const express = require('express');
const multer = require('multer');
const Report = require('../models/Report');  // Ensure you have this model
const router = express.Router();

// Configure multer storage for media and audio
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the destination folder for uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Ensure unique filenames
  }
});

const upload = multer({ storage });

// POST route for submitting reports
router.post('/report', upload.fields([
  { name: 'media', maxCount: 1 },  // Optional media field
  { name: 'audio', maxCount: 1 },  // Optional audio field
]), async (req, res) => {
  try {
    // Destructure the incoming data from the request body
    const { description, district, sector, cell, crimeType, dateTime, contact } = req.body;

    // Get the file paths for media and audio, if uploaded
    const media = req.files['media'] ? req.files['media'][0].path : null;  // File path for media
    const audio = req.files['audio'] ? req.files['audio'][0].path : null;  // File path for audio

    // Create a new report document
    const report = new Report({
      description,
      district,
      sector,
      cell,
      crimeType,
      dateTime,
      contact,
      media,  // Save the file path for media
      audio   // Save the file path for audio
    });

    // Save the report to the database
    await report.save();

    res.status(201).json({ message: 'Report submitted successfully' });
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({ error: 'Failed to submit report' });
  }
});

module.exports = router;
