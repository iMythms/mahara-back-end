const mongoose = require('mongoose')

const AdminUserSchema = new mongoose.Schema(
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
	},
	{
		timestamps: true,
	}
)

AdminUserSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject.password
	},
})

const AdminUser = mongoose.model('AdminUser', AdminUserSchema)

module.exports = AdminUser
