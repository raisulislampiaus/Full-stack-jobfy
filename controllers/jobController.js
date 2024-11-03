const Job = require("../models/Job");
const Company = require("../models/Company");
const axios = require('axios');
const { generateText } = require('../utils/aiTextGenerator');
require('dotenv').config();

exports.createJob = async (req, res) => {
  try {
    // Retrieve uploaded PDF URL (if available)
    const descriptionPdfUrl = req.file ? req.file.path : null;

    const job = new Job({
      title: req.body.title,
      description: req.body.description, // Text description
      descriptionPdfUrl: descriptionPdfUrl, // PDF URL
      company: req.body.company,
      location: req.body.location,
      salary: req.body.salary,
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for updating job descriptions with new PDF or text
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      salary: req.body.salary,
    };

    // Check if a new PDF is uploaded
    if (req.file) {
      updateData.descriptionPdfUrl = req.file.path;
    }

    const updatedJob = await Job.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getJobs = async (req, res) => {
  try {
    // Extract filter and search criteria from query parameters
    const { date, location, minSalary, maxSalary, company, search } = req.query;

    // Initialize a query object
    let query = {};

    // Date filter
    if (date) {
      const dateObj = new Date(date);
      query.createdAt = {
        $gte: dateObj.setHours(0, 0, 0, 0),
        $lt: dateObj.setHours(23, 59, 59, 999),
      };
    }

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Salary range filter
    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query.salary.$gte = parseInt(minSalary);
      if (maxSalary) query.salary.$lte = parseInt(maxSalary);
    }

    // Company filter
    if (company) {
      const companyData = await Company.findOne({
        name: { $regex: company, $options: "i" },
      });
      if (companyData) query.company = companyData._id;
    }

    // Search functionality: intelligent search for job titles and company names
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    // Fetch jobs based on query
    const jobs = await Job.find(query).populate("company", "name"); // Populate company name for better readability
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSuggestions = async (req, res) => {
  try {
    const { term } = req.query;

    if (!term) return res.json([]);

    // Fetch distinct job titles that match the search term
    const jobTitles = await Job.find(
      { title: { $regex: term, $options: "i" } },
      "title"
    ).distinct("title");

    // Fetch distinct company names that match the search term
    const companies = await Company.find(
      { name: { $regex: term, $options: "i" } },
      "name"
    ).distinct("name");

    // Combine and send results as suggestions
    const suggestions = {
      jobTitles,
      companies,
    };

    res.json(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedJob = await Job.findByIdAndDelete(id);
    
    // Check if the job was found and deleted
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Server error' });
  }
};






exports.generateJobDescription = async (req, res) => {
  const { prompt } = req.body; // Get prompt from request body

  try {
    const description = await generateText({ prompt }); // Call the generateText function
    res.json({ description }); // Send the generated description as a response
  } catch (error) {
    console.error("Error generating job description:", error);
    res.status(500).json({ message: "AI service request failed" }); // Send error response
  }
};
