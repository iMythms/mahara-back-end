const express = require('express')
const { sendEmail } = require('../middleware/emailUtils')

const router = express.Router()

// Test Email Route
router.post('/send', async (req, res) => {
	try {
		const { to, subject, message } = req.body

		// Send email
		await sendEmail(to, subject, message, `<p>${message}</p>`)

		res.status(200).json({ message: 'Email sent successfully!' })
	} catch (error) {
		console.error('Error sending email:', error)
		res.status(500).json({ error: 'Failed to send email.' })
	}
})

module.exports = router
