const express = require('express');
const { createCompany, getCompanies, updateCompany, deleteCompany } = require('../controllers/companyController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../utils/fileUpload'); // Import the Cloudinary upload middleware

const router = express.Router();

// Add `upload.single('logo')` to handle single file uploads for company logos
router.post('/create', authMiddleware, roleMiddleware(['admin', 'super-admin']), upload.single('logo'), createCompany);
router.get('/all', authMiddleware, getCompanies);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'super-admin']), upload.single('logo'), updateCompany);
router.delete('/:id', authMiddleware, roleMiddleware(['admin','super-admin']), deleteCompany);

module.exports = router;
