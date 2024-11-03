const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  logoUrl: String,
});

module.exports = mongoose.model('Company', companySchema);
