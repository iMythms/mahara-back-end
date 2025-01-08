const express = require('express')
const {
	addGalleryProject,
	getGalleryProject,
	deleteGalleryProject,
} = require('../controllers/gallery')
const router = express.Router()

// Add a new project to the gallery
router.post('/', addGalleryProject)

// Get all gallery projects for the logged-in freelancer
router.get('/', getGalleryProject)

// Delete a project from the gallery
router.delete('/:projectId', deleteGalleryProject)

module.exports = router
