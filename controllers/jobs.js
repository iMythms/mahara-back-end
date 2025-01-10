const Job = require('../models/jobs')
const Application = require('../models/application')

const createJob = async (req, res) => {
	try {
		const { applicationId, title, description } = req.body

		// Check if the application exists and is approved
		const application = await Application.findById(applicationId)
		if (!application) {
			return res.status(404).json({ error: 'Application not found.' })
		}
		if (application.status !== 'approved') {
			return res.status(400).json({ error: 'Application is not approved.' })
		}

		// Check if a job already exists for this application
		const existingJob = await Job.findOne({ applicationId })
		if (existingJob) {
			return res
				.status(400)
				.json({ error: 'Job already exists for this application.' })
		}

		// Create a new job
		const newJob = new Job({
			applicationId,
			clientId: application.clientId,
			freelancerId: application.freelancerId,
			title,
			description,
			status: 'todo', // Default status
		})

		await newJob.save()

		res.status(201).json({ message: 'Job created successfully.', job: newJob })
	} catch (error) {
		console.error(`Error in createJob: ${error.message}`)
		res.status(500).json({ error: 'Internal server error.' })
	}
}

// Get all jobs (Admin access)
const getAllJobs = async (req, res) => {
	try {
		// Ensure only admin can access
		if (req.user.roleType !== 'admin') {
			return res.status(403).json({ error: 'Access denied.' })
		}

		// Fetch all jobs
		const jobs = await Job.find()
			.populate('clientId', 'name email')
			.populate('freelancerId', 'name email')
			.populate('applicationId', 'message status')

		res.status(200).json(jobs)
	} catch (error) {
		console.error(`Error fetching all jobs: ${error.message}`)
		res.status(500).json({ error: 'Internal server error.' })
	}
}

// Get all jobs for the logged-in user (client or freelancer)
const getJobs = async (req, res) => {
	try {
		const { _id, role } = req.user

		// Filter jobs based on user role
		const filter = role === 'client' ? { clientId: _id } : { freelancerId: _id }

		// Fetch jobs with populated fields
		const jobs = await Job.find(filter)
			.populate('clientId', 'name email')
			.populate('freelancerId', 'name email')
			.populate('applicationId', 'message status')

		res.status(200).json(jobs)
	} catch (error) {
		console.error(`Error in getJobs: ${error.message}`)
		res.status(500).json({ error: 'Internal server error.' })
	}
}

// Update the status of a job
const updateJobStatus = async (req, res) => {
	try {
		const { jobId } = req.params
		const { status } = req.body

		// Validate the status
		if (!['todo', 'in_progress', 'complete'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status.' })
		}

		// Update the job status
		const updatedJob = await Job.findByIdAndUpdate(
			jobId,
			{ status },
			{ new: true }
		)

		if (!updatedJob) {
			return res.status(404).json({ error: 'Job not found.' })
		}

		res
			.status(200)
			.json({ message: `Job status updated to ${status}.`, job: updatedJob })
	} catch (error) {
		console.error(`Error in updateJobStatus: ${error.message}`)
		res.status(500).json({ error: 'Internal server error.' })
	}
}

module.exports = {
	createJob,
	getAllJobs,
	getJobs,
	updateJobStatus,
}
