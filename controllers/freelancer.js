const { application } = require('express')
const Application = require('../models/application')
const FreelancerUser = require('../models/freelancerUser')
const ClientUser = require('../models/clientUser')

// Fetch all freelancer User
const index = async (req, res) => {
  try {
    const foundFreelancer = await FreelancerUser.find()
    res.status(200).json(foundFreelancer)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Fetch freelancer categories to sort
const findAppFreelancer = async (req, res) => {
  try {
    const applications = await FreelancerUser.find({
      categories: req.params.applicationId
    })
    res.status(200).json(applications)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// // Get all categories for the logged-in freelancer
// const getCategoriesForFreelancer = async (req, res) => {
//   try {
//     const freelancerId = req.user._id

//     // Fetch all categories for the freelancer
//     const categories = await categories
//       .find({ freelancerId })
//       .populate('categories')
//     res.status(200).json(applications)
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error.' })
//   }
// }
