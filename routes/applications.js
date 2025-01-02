const express = require('express')
const {
	createApplication,
	getApplicationsForFreelancer,
	updateApplicationStatus,
} = require('../controllers/applications')
const router = express.Router()

// Create a new application
router.post('/', createApplication)

// Get applications for the logged-in freelancer
router.get('/', getApplicationsForFreelancer)

// Update application status (approve/reject)
router.put('/:applicationId', updateApplicationStatus)

module.exports = router
