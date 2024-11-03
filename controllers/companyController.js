const Company = require('../models/Company');
const { z } = require('zod');
const asyncHandler = require('express-async-handler');

// Define the Zod schema for company creation and update
const companySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
});

// Handler to create a new company
exports.createCompany = asyncHandler(async (req, res) => {
  try {
    // Validate request body
    const parsedData = companySchema.parse(req.body);

    // Retrieve uploaded logo URL from Cloudinary
    const logoUrl = req.file ? req.file.path : null;

    // Create a new company document
    const company = new Company({
      name: parsedData.name,
      description: parsedData.description,
      logoUrl: logoUrl, // Save the logo URL in the database
    });

    await company.save();
    res.status(201).json(company);
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(400).json({ message: error.message });
  }
});

// Handler to get all companies
exports.getCompanies = asyncHandler(async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


exports.updateCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Validate request body
    const parsedData = companySchema.partial().parse(req.body); // Allow partial updates

    // If a new logo is uploaded, get the logo URL from the request file
    if (req.file) {
      parsedData.logoUrl = req.file.path; // Update the logoUrl with the new logo URL
    }

    const updatedCompany = await Company.findByIdAndUpdate(id, parsedData, { new: true });
    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(updatedCompany);
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(400).json({ message: error.message });
  }
});


// Handler to delete a company
exports.deleteCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCompany = await Company.findByIdAndDelete(id);
    if (!deletedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
