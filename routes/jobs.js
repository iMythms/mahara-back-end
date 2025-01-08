const express = require('express')
const { createJob, getJobs, updateJobStatus } = require('../controllers/jobs')
const router = express.Router()

// Create a new job
router.post('/new', createJob)

// Get jobs for the logged-in user
router.get('/list', getJobs)

// Update the status of a job
router.put('/:jobId', updateJobStatus)

module.exports = router
