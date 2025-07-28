const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  githubUrl: { type: String },
  liveUrl: { type: String },
  featured: { type: Boolean, default: false },
});

module.exports = mongoose.model('Project', projectSchema);
