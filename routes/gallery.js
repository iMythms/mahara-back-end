const express = require('express')
const {
	addGalleryProject,
	getGalleryProject,
	getGalleryProjectsForFreelancer,
	deleteGalleryProject,
} = require('../controllers/gallery')
const { storage } = require('../config/cloudinary')
const multer = require('multer')
const upload = multer({ storage })

const router = express.Router()

// Add a new project to the gallery
router.post('/new', upload.array('images', 5), addGalleryProject)

// Get all gallery projects for the logged-in freelancer
router.get('/list', getGalleryProject)

// Delete a project from the gallery
router.delete('/:projectId', deleteGalleryProject)

// fetch a freelancer's gallery projects
router.get('/:freelancerId', getGalleryProjectsForFreelancer)

module.exports = router
