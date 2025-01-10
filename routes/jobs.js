const express = require('express')
const {
	createJob,
	getAllJobs,
	getJobs,
	updateJobStatus,
} = require('../controllers/jobs')
const router = express.Router()

// Create a new job
router.post('/new', createJob)

// Get all jobs (admin only)
router.get('/list/admin', getAllJobs)

// Get jobs for the logged-in user
router.get('/list', getJobs)

// Update the status of a job
router.put('/:jobId', updateJobStatus)

module.exports = router
