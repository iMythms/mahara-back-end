const express = require('express')
const { getUserProfile, updateUserProfile } = require('../controllers/user')
const { verifyToken } = require('../middleware/jwtUtils')

const router = express.Router()

// Get the profile of the logged-in user
router.get('/profile', verifyToken, getUserProfile)

// Update the profile of the logged-in user
router.put('/update', verifyToken, updateUserProfile)

module.exports = router
