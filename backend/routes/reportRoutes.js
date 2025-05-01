const express = require('express');
const multer = require('multer');
const Report = require('../models/Report');
const path = require('path');
const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Serve uploaded media/audio
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ✅ POST: Submit a new report
router.post('/report', upload.fields([
  { name: 'media', maxCount: 1 },
  { name: 'audio', maxCount: 1 },
]), async (req, res) => {
  try {
    const { description, district, sector, cell, crimeType, dateTime, contact } = req.body;

    if (!description || !district || !sector || !cell || !crimeType || !dateTime || !contact) {
      return res.status(400).json({ error: 'All fields are required except media and audio.' });
    }

    const media = req.files['media'] ? req.files['media'][0].path : null;
    const audio = req.files['audio'] ? req.files['audio'][0].path : null;

    const report = new Report({
      description,
      district,
      sector,
      cell,
      crimeType,
      dateTime,
      contact,
      media,
      audio,
    });

    await report.save();
    res.status(201).json({ message: 'Report submitted successfully', report });
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({ error: 'Failed to submit report' });
  }
});

// ✅ GET: All reports
router.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find().sort({ dateTime: -1 });
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Error fetching reports' });
  }
});

// ✅ GET: Single report by ID
router.get('/reports/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ message: 'Error fetching the report' });
  }
});

// ✅ PATCH: Mark a report as done
router.patch('/reports/:id/done', async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { isDone: true },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({ message: 'Report marked as done', report });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ message: 'Failed to mark report as done' });
  }
});

// ✅ PATCH: Mark a report as accepted
router.patch('/reports/:id/accept', async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { isAccepted: true },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({ message: 'Report accepted successfully', report });
  } catch (error) {
    console.error('Error accepting report:', error);
    res.status(500).json({ message: 'Error accepting report' });
  }
});

// ✅ GET: Only accepted reports
router.get('/accepted-reports', async (req, res) => {
  try {
    const acceptedReports = await Report.find({ isAccepted: true }).sort({ dateTime: -1 });
    res.json(acceptedReports);
  } catch (error) {
    console.error('Error fetching accepted reports:', error);
    res.status(500).json({ message: 'Error fetching accepted reports' });
  }
});

// ✅ GET: Only done reports
router.get('/done-reports', async (req, res) => {
  try {
    const doneReports = await Report.find({ isDone: true }).sort({ dateTime: -1 });
    res.json(doneReports);
  } catch (error) {
    console.error('Error fetching done reports:', error);
    res.status(500).json({ message: 'Error fetching done reports' });
  }
});

module.exports = router;
