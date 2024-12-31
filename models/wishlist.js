const mongoose = require('mongoose')

const WishlistSchema = new mongoose.Schema(
	{
		clientId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ClientUser',
			required: true,
		},
		freelancerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'FreelancerUser',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

const Wishlist = mongoose.model('Wishlist', WishlistSchema)

module.exports = Wishlist
