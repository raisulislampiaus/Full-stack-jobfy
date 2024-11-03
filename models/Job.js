const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,  // Text description
  descriptionPdfUrl: String,  // URL of the PDF description
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  location: String,
  salary: Number,
});

module.exports = mongoose.model('Job', jobSchema);
