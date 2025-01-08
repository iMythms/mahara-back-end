const ContactUs = require('../models/contactUs')

// Submit a Contact Us Form
const submitContactUsForm = async (req, res) => {
	try {
		const { name, email, subject, message } = req.body

		// Validate input
		if (!name || !email || !subject || !message) {
			return res.status(400).json({ error: 'All fields are required.' })
		}

		// Save the contact us form submission
		const newQuery = new ContactUs({
			name,
			email,
			subject,
			message,
		})

		await newQuery.save()

		res
			.status(201)
			.json({
				message: 'Your query has been submitted successfully.',
				query: newQuery,
			})
	} catch (error) {
		res.status(500).json({ error: 'Internal server error.' })
	}
}

// Get All Contact Us Submissions (For Admins Only)
const getAllSubmissions = async (req, res) => {
	try {
		// Fetch all submissions
		const submissions = await ContactUs.find().sort({ createdAt: -1 })

		res.status(200).json(submissions)
	} catch (error) {
		res.status(500).json({ error: 'Internal server error.' })
	}
}

// Delete a Contact Us Submission (For Admins Only)
const deleteSubmission = async (req, res) => {
	try {
		const { submissionId } = req.params

		// Find and delete the submission
		const deletedSubmission = await ContactUs.findByIdAndDelete(submissionId)
		if (!deletedSubmission) {
			return res.status(404).json({ error: 'Submission not found.' })
		}

		res.status(200).json({ message: 'Submission deleted successfully.' })
	} catch (error) {
		res.status(500).json({ error: 'Internal server error.' })
	}
}

module.exports = {
	submitContactUsForm,
	getAllSubmissions,
	deleteSubmission,
}
