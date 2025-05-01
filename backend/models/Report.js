const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  description: String,
  district: String,
  sector: String,
  cell: String,
  crimeType: String,
  dateTime: Date,
  contact: String,
  media: String, // path to media
  audio: String, // path to audio
  isDone: { type: Boolean, default: false },
  isAccepted: { type: Boolean, default: false }, // Make sure this exists
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
