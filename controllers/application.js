const Application = require('../models/application')

const GetApplication = async (req, res) => {
  try {
    const applications = await Application.find({})

    res.status(200).json({
      message: 'Applications retrieved successfully.',
      applications
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' })
  }
}

const CreateApplication = async (req, res) => {
  try {
    const { message, status } = req.body
    const freelancerId = req.params.freelancerId
    const clientId = req.user._id

    if (!freelancerId || !message || !status) {
      return res
        .status(400)
        .json({ error: 'Freelancer ID, message, and status are required.' })
    }

    const newApplication = new Application({
      clientId,
      freelancerId,
      message,
      status
    })

    await newApplication.save()

    res.status(201).json({
      message: 'Application submitted successfully',
      application: newApplication
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

const UpdateApplication = async (req, res) => {
  try {
    const { id } = req.params
    const { message, status } = req.body
    const clientId = req.user._id

    const updatedApplication = await Application.findOneAndUpdate(
      { _id: id, clientId },
      { message, status },
      { new: true, runValidators: true }
    )

    if (!updatedApplication) {
      return res
        .status(404)
        .json({ error: 'Application not found or unauthorized.' })
    }

    res.status(200).json({
      message: 'Application updated successfully.',
      application: updatedApplication
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' })
  }
}

const DeleteApplication = async (req, res) => {
  try {
    const { id } = req.params
    const clientId = req.user._id

    const deletedApplication = await Application.findOneAndDelete({
      _id: id,
      clientId
    })

    if (!deletedApplication) {
      return res
        .status(404)
        .json({ error: 'Application not found or unauthorized.' })
    }

    res.status(200).json({
      message: 'Application deleted successfully.',
      application: deletedApplication
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' })
  }
}

module.exports = {
  GetApplication,
  CreateApplication,
  UpdateApplication,
  DeleteApplication
}
