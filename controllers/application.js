const Application = require('../models/application')

const Get = async (req, res) => {
  try {
    const { applicationId, clientId, freelancerId, status } = req.query

    let applications

    if (applicationId) {
      applications = await Application.findById(applicationId)

      if (!applications) {
        return res.status(404).json({ error: 'Application not found.' })
      }
    } else {
      const query = {}

      if (clientId) query.clientId = clientId
      if (freelancerId) query.freelancerId = freelancerId
      if (status) query.status = status

      applications = await Application.find(query)
    }

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
    const { clientId, freelancerId, message, status } = req.body

    if (!clientId || !freelancerId || !message || !status) {
      return res.status(400).json({ error: 'All fields are required.' })
    }

    const newApplication = new Application({
      clientId,
      freelancerId,
      message,
      status
    })
    await newApplication.save()

    res.status(201).json({
      message: 'Application Created.',
      application: newApplication
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' })
  }
}

const UpdateApplication = async (req, res) => {
  try {
    const { applicationId, clientId, freelancerId, message, status } = req.body

    if (!applicationId) {
      return res.status(400).json({ error: 'Application ID is required.' })
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { clientId, freelancerId, message, status },
      { new: true, runValidators: true }
    )

    if (!updatedApplication) {
      return res.status(404).json({ error: 'Application not found.' })
    }

    res.status(200).json({
      message: 'Application Updated.',
      application: updatedApplication
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' })
  }
}

const DeleteApplication = async (req, res) => {
  try {
    const { applicationId } = req.body

    if (!applicationId) {
      return res.status(400).json({ error: 'Application ID is required.' })
    }

    const deletedApplication = await Application.findByIdAndDelete(
      applicationId
    )

    if (!deletedApplication) {
      return res.status(404).json({ error: 'Application not found.' })
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
