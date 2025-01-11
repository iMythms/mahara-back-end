const express = require('express')
const {
	getFreelancersByCategory,
	getUserProfile,
	updateUserProfile,
	getFreelancerById,
} = require('../controllers/user')
const { verifyToken } = require('../middleware/jwtUtils')

const router = express.Router()

// Fetch freelancers by category
router.get('/freelancers/category', getFreelancersByCategory)

// Get the profile of the logged-in user
router.get('/profile', verifyToken, getUserProfile)

router.get('/freelancers/:id', getFreelancerById)

// Update the profile of the logged-in user
router.put('/update', verifyToken, updateUserProfile)

module.exports = router
