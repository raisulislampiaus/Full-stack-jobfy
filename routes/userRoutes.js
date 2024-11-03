const express = require('express');
const {
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAllAdmins,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

// Route to create an admin - only accessible by super-admin
router.post('/create', authMiddleware, roleMiddleware(['super-admin']), createAdmin);

// Route to update an admin - accessible by admin and super-admin
router.put('/:userId', authMiddleware, roleMiddleware(['admin', 'super-admin']), updateAdmin);

// Route to delete an admin - only accessible by super-admin
router.delete('/:userId', authMiddleware, roleMiddleware(['super-admin']), deleteAdmin);

// Route to get all admins - accessible by super-admin
router.get('/', authMiddleware, roleMiddleware(['super-admin']), getAllAdmins);

module.exports = router;
