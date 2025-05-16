const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  description: String,
  province: String,
  district: String,
  sector: String,
  crimeType: String,
  dateTime: Date,
  contact: String,
  media: String, // path to media
  audio: String, // path to audio
  completed: { type: Boolean, default: false },
  isAccepted: { type: Boolean, default: false },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
