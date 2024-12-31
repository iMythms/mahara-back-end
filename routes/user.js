const express = require('express')
const { getUserProfile, updateUserProfile } = require('../controllers/user')

const router = express.Router()

// Get the profile of the logged-in user
router.get('/profile', getUserProfile)

// Update the profile of the logged-in user
router.put('/profile', updateUserProfile)

module.exports = router
