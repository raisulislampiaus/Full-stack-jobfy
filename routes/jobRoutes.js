const express = require('express');
const { createJob, getJobs, updateJob, deleteJob, getSuggestions,generateJobDescription } = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../utils/pdfUpload');

const router = express.Router();

// Route to create a new job with text and PDF description
router.post('/create', authMiddleware, roleMiddleware(['admin','super-admin']), upload.single('file'), createJob);

// Route to get jobs with filters and search functionality
router.get('/', authMiddleware, getJobs);

// Route to get intelligent search suggestions
router.get('/suggestions', authMiddleware, getSuggestions);

router.put('/:id', authMiddleware, roleMiddleware(['admin','super-admin']), upload.single('file'), updateJob);
router.delete('/:id', authMiddleware, roleMiddleware(['admin','super-admin']), deleteJob);

router.post('/generate-description', generateJobDescription);



module.exports = router;
