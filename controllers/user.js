const AdminUser = require('../models/adminUser')
const ClientUser = require('../models/clientUser')
const FreelancerUser = require('../models/freelancerUser')

// Get Freelancer by Category
const getFreelancersByCategory = async (req, res) => {
	try {
		const { category } = req.query // Get category from query params
		const freelancers = await FreelancerUser.find({
			categories: category,
		}).select('name profilePicture averageRating categories')
		res.status(200).json(freelancers)
	} catch (error) {
		console.error(`Error fetching freelancers: ${error.message}`)
		res.status(500).json({ error: 'Internal server error.' })
	}
}

// Get User Profile
const getUserProfile = async (req, res) => {
	try {
		const { _id, role } = req.user

		// Determine the user model based on the role
		let UserModel
		switch (role) {
			case 'admin':
				UserModel = AdminUser
				break
			case 'client':
				UserModel = ClientUser
				break
			case 'freelancer':
				UserModel = FreelancerUser
				break
			default:
				return res.status(400).json({ error: 'Invalid user role.' })
		}

		// Find the user by ID
		const user = await UserModel.findById(_id).select('-password') // Exclude password
		if (!user) {
			return res.status(404).json({ error: 'User not found.' })
		}

		// Ensure `categories` is always an array
		if (user.categories && typeof user.categories === 'string') {
			user.categories = user.categories.split(',') // Split string into an array
		}

		res.status(200).json({ user })
	} catch (error) {
		console.error('Error fetching user profile:', error)
		res.status(500).json({ error: 'Internal server error.' })
	}
}

const getFreelancerById = async (req, res) => {
	try {
		const { id } = req.params // Extract freelancer ID from route params
		const freelancer = await FreelancerUser.findById(id).select('-password') // Use FreelancerUser instead of User

		if (!freelancer) {
			return res.status(404).json({ error: 'Freelancer not found.' })
		}

		res.json(freelancer) // Return the freelancer data
	} catch (error) {
		console.error('Error fetching freelancer:', error)
		res.status(500).json({ error: 'Internal server error.' })
	}
}

// Update User Profile
const updateUserProfile = async (req, res) => {
	try {
		const { _id, role } = req.user

		// Determine the user model based on the role
		let UserModel
		switch (role) {
			case 'admin':
				UserModel = AdminUser
				break
			case 'client':
				UserModel = ClientUser
				break
			case 'freelancer':
				UserModel = FreelancerUser
				break
			default:
				return res.status(400).json({ error: 'Invalid user role.' })
		}

		// Prepare the update object
		const updateData = { ...req.body }

		// Parse `categories` if it's a string
		if (updateData.categories && typeof updateData.categories === 'string') {
			updateData.categories = JSON.parse(updateData.categories) // Parse JSON string
		}

		// Handle profile picture if uploaded
		if (req.file) {
			updateData.profilePicture = req.file.path
		}

		// Update the user
		const updatedUser = await UserModel.findByIdAndUpdate(_id, updateData, {
			new: true,
			runValidators: true,
		}).select('-password')

		if (!updatedUser) {
			return res.status(404).json({ error: 'User not found.' })
		}

		res.status(200).json({
			message: 'Profile updated successfully.',
			user: updatedUser,
		})
	} catch (error) {
		console.error('Error updating profile:', error)
		res.status(500).json({ error: 'Internal server error.' })
	}
}

module.exports = {
	getFreelancersByCategory,
	getUserProfile,
	updateUserProfile,
	getFreelancerById,
}
