const Gallery = require('../models/gallery')
const multer = require('multer')
const { storage } = require('../config/cloudinary')
const upload = multer({ storage })

// Add a project to the gallery
const addGalleryProject = async (req, res) => {
	try {
		const freelancerId = req.user._id
		const { projectName, description } = req.body

		// Get image URLs from uploaded files
		const images = req.files.map((file) => file.path)

		// Validate the number of uploaded images
		if (images.length > 5) {
			return res
				.status(400)
				.json({ error: 'A maximum of 5 images is allowed.' })
		}

		// Create a new gallery project
		const newProject = new Gallery({
			freelancerId,
			projectName,
			description,
			images, // Store image URLs
		})
		await newProject.save()

		res.status(201).json({
			message: 'Gallery project added successfully.',
			project: newProject,
		})
	} catch (error) {
		console.error('Error adding gallery project:', error)
		res.status(500).json({ error: 'Internal server error.' })
	}
}

// Get all projects for a freelancer
const getGalleryProject = async (req, res) => {
	try {
		const freelancerId = req.user._id

		// Fetch all gallery projects for the freelancer
		const projects = await Gallery.find({ freelancerId })

		res.status(200).json(projects)
	} catch (error) {
		res.status(500).json({ error: 'Internal server error.' })
	}
}

// Fetch all gallery projects for a specific freelancer
const getGalleryProjectsForFreelancer = async (req, res) => {
	try {
		const { freelancerId } = req.params // Extract freelancer ID from route parameters

		// Find projects associated with the freelancer ID
		const projects = await Gallery.find({ freelancerId })

		// Handle case when no projects are found
		if (!projects || projects.length === 0) {
			return res
				.status(404)
				.json({ error: 'No projects found for this freelancer.' })
		}

		res.status(200).json(projects)
	} catch (error) {
		console.error('Error fetching gallery projects:', error)
		res.status(500).json({ error: 'Internal server error.' })
	}
}

// Delete a project from the gallery
const deleteGalleryProject = async (req, res) => {
	try {
		const freelancerId = req.user._id // Extract freelancer ID from the authenticated user
		const { projectId } = req.params

		// Find and delete the project
		const deletedProject = await Gallery.findOneAndDelete({
			_id: projectId,
			freelancerId,
		})
		if (!deletedProject) {
			return res
				.status(404)
				.json({ error: 'Project not found or not authorized to delete.' })
		}

		res.status(200).json({ message: 'Gallery project deleted successfully.' })
	} catch (error) {
		res.status(500).json({ error: 'Internal server error.' })
	}
}

module.exports = {
	addGalleryProject,
	getGalleryProject,
	getGalleryProjectsForFreelancer,
	deleteGalleryProject,
}
