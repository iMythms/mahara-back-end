const Job = require('../models/jobs')
const Application = require('../models/application')

// Create a Job from an approved application
const createJob = async (req, res) => {
	try {
		const { applicationId, title, description } = req.body

		// Check if the application exists and is approved
		const application = await Application.findById(applicationId)
		if (!application || application.status !== 'approved') {
			return res
				.status(400)
				.json({ error: 'Invalid or unapproved application.' })
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
		res.status(500).json({ error: 'Internal server error.' })
	}
}

// Get all jobs for the logged-in user (client or freelancer)
const getJobs = async (req, res) => {
	try {
		const { _id, role } = req.user

		// Filter jobs based on user role
		const filter = role === 'client' ? { clientId: _id } : { freelancerId: _id }

		// Fetch jobs
		const jobs = await Job.find(filter)
			.populate('clientId', 'name email')
			.populate('freelancerId', 'name email')

		res.status(200).json(jobs)
	} catch (error) {
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
		res.status(500).json({ error: 'Internal server error.' })
	}
}

module.exports = {
	createJob,
	getJobs,
	updateJobStatus,
}
