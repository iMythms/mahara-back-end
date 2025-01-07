const express = require('express')
const { createJob, getJobs, updateJobStatus } = require('../controllers/jobs')
const router = express.Router()

// Create a new job
router.post('/', createJob)

// Get jobs for the logged-in user
router.get('/', getJobs)

// Update the status of a job
router.put('/:jobId', updateJobStatus)

module.exports = router
