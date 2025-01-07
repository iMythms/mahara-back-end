const express = require('express')
const {
  createApplication,
  getApplicationsForFreelancer,
  updateApplicationStatus
} = require('../controllers/applications')
const router = express.Router()

// Create a new application
router.post('/create_application', createApplication)

// Get applications for the logged-in freelancer
router.get('/applications_list', getApplicationsForFreelancer)

// Update application status (approve/reject)
router.put('/:applicationId', updateApplicationStatus)

module.exports = router
