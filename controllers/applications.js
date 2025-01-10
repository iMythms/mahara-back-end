const Application = require('../models/application')
const Job = require('../models/jobs')
const FreelancerUser = require('../models/freelancerUser')
const { sendEmail } = require('../middleware/emailUtils')

// Create a new application (client request to freelancer)
const createApplication = async (req, res) => {
	try {
		const clientId = req.user._id
		const { freelancerId, title, message } = req.body

		// Check if the freelancer exists
		const freelancer = await FreelancerUser.findById(freelancerId)
		if (!freelancer) {
			return res.status(404).json({ error: 'Freelancer not found.' })
		}

		// Create a new application
		const newApplication = new Application({
			clientId,
			freelancerId,
			title,
			message,
			status: 'pending',
		})

		await newApplication.save()

		// Send email notification to the freelancer
		const subject = `New Application Received: ${title}`
		const text = `You have received a new application from a client. Here is the message: \n\n${message}`
		const html = `<p>You have received a new application from a client.</p><p>Message:</p><p>${message}</p>`

		await sendEmail(freelancer.email, subject, text, html)

		res.status(201).json({
			message: 'Application created successfully and email sent to freelancer.',
			application: newApplication,
		})
	} catch (error) {
		console.error(`Error in createApplication: ${error.message}`)
		res.status(500).json({ error: 'Internal server error.' })
	}
}

// Get all applications (Admin access)
const getAllApplications = async (req, res) => {
	try {
		// Ensure only admin can access
		if (req.user.roleType !== 'admin') {
			return res.status(403).json({ error: 'Access denied.' })
		}

		// Fetch all applications
		const applications = await Application.find()
			.populate('clientId', 'name email profilePicture')
			.populate('freelancerId', 'name email profilePicture')

		res.status(200).json(applications)
	} catch (error) {
		console.error(`Error fetching all applications: ${error.message}`)
		res.status(500).json({ error: 'Internal server error.' })
	}
}

// Get all application for the logged-in freelancer
const getApplicationsForFreelancer = async (req, res) => {
	try {
		const freelancerId = req.user._id
		const { status } = req.query // Extract the status query parameter

		// Build the query filter
		const filter = { freelancerId } // Base filter
		if (status) {
			filter.status = status // Add status to the filter if provided
		}

		// Fetch applications with optional filtering by status
		const applications = await Application.find(filter).populate(
			'clientId',
			'name email profilePicture'
		)

		res.status(200).json(applications)
	} catch (error) {
		console.error(`Error fetching applications: ${error.message}`)
		res.status(500).json({ error: 'Internal server error.' })
	}
}

// Get all applications for the logged-in client
const getApplicationsForClient = async (req, res) => {
	try {
		const clientId = req.user._id // Get the client ID from the authenticated user
		const applications = await Application.find({ clientId }).populate(
			'freelancerId',
			'name email profilePicture'
		)

		res.status(200).json(applications)
	} catch (error) {
		console.error(`Error fetching applications for client: ${error.message}`)
		res.status(500).json({ error: 'Internal server error.' })
	}
}

// Update application status (approve or reject)
const updateApplicationStatus = async (req, res) => {
	try {
		const freelancerId = req.user._id
		const { applicationId } = req.params
		const { status } = req.body

		// Validate the status
		if (!['approved', 'rejected'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status.' })
		}

		// Find the application and ensure it belongs to the freelancer
		const application = await Application.findOneAndUpdate(
			{ _id: applicationId, freelancerId },
			{ status },
			{ new: true }
		)

		if (!application) {
			return res
				.status(404)
				.json({ error: 'Application not found or not authorized.' })
		}

		// If approved, create a job
		if (status === 'approved') {
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
				title: application.title,
				description: application.message, // Use application message as the job description
				status: 'todo', // Default status
			})

			await newJob.save()
			console.log('Job created successfully:', newJob)
		}

		res.status(200).json({ message: `Application ${status}`, application })
	} catch (error) {
		console.error(`Error in updateApplicationStatus: ${error.message}`)
		res.status(500).json({ error: 'Internal server error.' })
	}
}

module.exports = {
	createApplication,
	getAllApplications,
	getApplicationsForFreelancer,
	getApplicationsForClient,
	updateApplicationStatus,
}
