const mongoose = require('mongoose')

const GallerySchema = new mongoose.Schema(
	{
		freelancerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'FreelancerUser',
			required: true,
		},
		projectName: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		images: {
			type: [String],
			validate: {
				validator: function (v) {
					return v.length <= 5
				},
				message: 'A maximum of 5 images is allowed.',
			},
		},
	},
	{
		timestamps: true,
	}
)

const Gallery = mongoose.model('Gallery', GallerySchema)

module.exports = Gallery
