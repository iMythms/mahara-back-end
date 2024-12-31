const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
	{
		applicationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Application',
			required: true,
		},
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
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ['todo', 'in_progress', 'complete'],
			default: 'todo',
		},
	},
	{
		timestamps: true,
	}
)

const Job = mongoose.model('Job', JobSchema)

module.exports = Job
