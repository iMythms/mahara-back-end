const mongoose = require('mongoose')

const ApplicationSchema = new mongoose.Schema(
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
		message: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ['pending', 'approved', 'rejected'],
			default: 'pending',
		},
	},
	{
		timestamps: true,
	}
)

const Application = mongoose.model('Application', ApplicationSchema)

module.exports = Application
