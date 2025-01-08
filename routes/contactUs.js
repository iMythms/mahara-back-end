const express = require('express')
const {
	submitContactUsForm,
	getAllSubmissions,
	deleteSubmission,
} = require('../controllers/contactUs')
const { verifyToken } = require('../middleware/jwtUtils')
const router = express.Router()

// Submit a contact us form (Open to all visitors)
router.post('/new', submitContactUsForm)

// Get all contact us submissions (Admin only)
router.get('/list', verifyToken, getAllSubmissions)

// Delete a submission (Admin only)
router.delete('/:submissionId', verifyToken, deleteSubmission)

module.exports = router
