const Wishlist = require('../models/wishlist')
const FreelancerUser = require('../models/freelancerUser')

// Add a freelancer to the wishlist
const addToWishlist = async (req, res) => {
	try {
		const clientId = req.user._id
		const { freelancerId } = req.body

		// Check if the freelancer exists
		const freelancer = await FreelancerUser.findById(freelancerId)
		if (!freelancer) {
			return res.status(404).json({ error: 'Freelancer not found.' })
		}

		// Check if the freelancer is already in the wishlist
		const existingEntry = await Wishlist.findOne({ clientId, freelancerId })
		if (existingEntry) {
			return res.status(400).json({ error: 'Freelancer already in wishlist' })
		}

		// Add to wishlist
		const newWishlistEntry = new Wishlist({ clientId, freelancerId })
		await newWishlistEntry.save()

		res.status(201).json({
			message: 'Freelancer added to wishlist.',
			wishlist: newWishlistEntry,
		})
	} catch (error) {
		res.status(500).json({ error: 'Internal server error.' })
	}
}

// Remove a freelancer from the wishlist
const removeFromWishlist = async (req, res) => {
	try {
		const clientId = req.user._id
		const { freelancerId } = req.params

		// Find and remove the entry
		const removeEntry = await Wishlist.findByIdAndDelete({
			clientId,
			freelancerId,
		})
		if (!removeEntry) {
			return res
				.status(404)
				.json({ error: 'Freelancer not found in wishlist.' })
		}

		res.status(200).json({ message: 'Freelancer removed from wishlist.' })
	} catch (error) {
		res.status(500).json({ error: 'Internal server error.' })
	}
}

// Get all freelancers in the client's wishlist
const getWishlist = async (req, res) => {
	try {
		const clientId = req.user._id // Extract client ID from the authenticated user

		// Fetch all wishlist entries for the client
		const wishlist = await Wishlist.find({ clientId }).populate(
			'freelancerId',
			'name email profilePicture categories averageRating'
		)

		res.status(200).json(wishlist)
	} catch (error) {
		res.status(500).json({ error: 'Internal server error.' })
	}
}

module.exports = {
	addToWishlist,
	removeFromWishlist,
	getWishlist,
}
