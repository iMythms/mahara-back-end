const mongoose = require('mongoose')

const ClientUserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		profilePicture: {
			type: String,
			default: null,
		},
		roleType: {
			type: String,
			required: true,
			default: 'client',
		},
	},
	{
		timestamps: true,
	}
)

ClientUserSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject.password
	},
})

const ClientUser = mongoose.model('ClientUser', ClientUserSchema)

module.exports = ClientUser
