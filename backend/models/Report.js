const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  crimeType: { type: String, required: true },
  description: { type: String, required: true },
  district: { type: String, required: true },
  sector: { type: String, required: true },
  cell: { type: String, required: true },
  dateTime: { type: Date, required: true },
  media: { type: String },  // Store file path as a string
  audio: { type: String },  // Store file path as a string
  contact: { type: String, required: true }
}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
