const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  summary: { type: String, required: true },
  cvUrl: { type: String },
});

module.exports = mongoose.model('Profile', profileSchema);
