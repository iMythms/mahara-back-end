const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

// Cloudinary Config
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Multer storage configuration
const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: 'mahara-projects', // Folder where images will be stored in Cloudinary
		allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file formats
	},
})

module.exports = { cloudinary, storage }
