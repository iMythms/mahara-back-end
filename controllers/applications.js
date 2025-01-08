const { application } = require('express')
const Application = require('../models/application')
const FreelancerUser = require('../models/freelancerUser')

// Create a new application (client request to freelancer)
const createApplication = async (req, res) => {
  try {
    const clientId = req.user._id
    const { freelancerId, message } = req.body

    // Check if the freelancer exists
    const freelancer = await FreelancerUser.findById(freelancerId)
    if (!freelancer) {
      console.error(error)
      console.log(error)

      return res.status(404).json({ error: 'Freelancer not found.' })
    }

    // Create A new application
    const newApplication = new Application({
      clientId,
      freelancerId,
      message,
      status: 'pending'
    })

    await newApplication.save()

    res.status(201).json({
      message: 'Application created successfully.',
      application: newApplication
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' })
  }
}

// Get all application for the logged-in freelancer
const getApplicationsForFreelancer = async (req, res) => {
  try {
    const freelancerId = req.user._id

    // Fetch all applications for the freelancer
    const applications = await Application.find({ freelancerId }).populate(
      'clientId',
      'name email profilePicture'
    )
    res.status(200).json(applications)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' })
  }
}

// Update application status (approve or reject)
const updateApplicationStatus = async (req, res) => {
  try {
    const freelancerId = req.user._id
    const { applicationId } = req.params
    const { status } = req.body

    // Validate the status
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status.' })
    }

    // Find the application and ensure it belongs to the freelancer
    const application = await Application.findOneAndUpdate(
      { _id: applicationId, freelancerId },
      { status },
      { new: true }
    )

    if (!application) {
      return res
        .status(404)
        .json({ error: 'Application not found or not authorized.' })
    }

    res.status(200).json({ message: `Application ${status}`, application })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' })
  }
}

module.exports = {
  createApplication,
  getApplicationsForFreelancer,
  updateApplicationStatus
}
