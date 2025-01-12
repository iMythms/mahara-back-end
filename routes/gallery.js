const express = require('express')
const {
	addGalleryProject,
	getGalleryProject,
	getGalleryProjectsForFreelancer,
	getGalleryProjectById,
	updateGalleryProject,
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

// Fetch a single gallery project by ID
router.get('/project/:projectId', getGalleryProjectById)

// Update a project from the gallery
router.put(
	'/update/:projectId',
	upload.array('images', 5),
	updateGalleryProject
)

// Delete a project from the gallery
router.delete('/:projectId', deleteGalleryProject)

// fetch a freelancer's gallery projects
router.get('/:freelancerId', getGalleryProjectsForFreelancer)

module.exports = router
