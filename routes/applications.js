const express = require('express')
const {
	createApplication,
	getAllApplications,
	getApplicationsForFreelancer,
	getApplicationsForClient,
	updateApplicationStatus,
} = require('../controllers/applications')
const router = express.Router()

// Create a new application
router.post('/new', createApplication)

// Get all applications (admin only)
router.get('/admin/list', getAllApplications)

// Get applications for the logged-in freelancer
router.get('/freelancer/list', getApplicationsForFreelancer)

// Get applications for the logged-in client
router.get('/client/list', getApplicationsForClient)

// Update application status (approve/reject)
router.put('/:applicationId', updateApplicationStatus)

module.exports = router
