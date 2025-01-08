const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: process.env.SMTP_SECURITY_TYPE === 'SSL', // Use true for SSL (port 465)
	auth: {
		user: process.env.SMTP_USER, // SMTP username
		pass: process.env.SMTP_PASS, // SMTP password
	},
})

const sendEmail = async (to, subject, text, html) => {
	try {
		const mailOptions = {
			from: process.env.FROM_EMAIL, // Sender email address (from .env)
			to, // Recipient email address
			subject, // Email subject
			text, // Plain text body
			html, // HTML body (optional)
		}

		const info = await transporter.sendMail(mailOptions)
		console.log(`Email sent: ${info.response}`)
		return info
	} catch (error) {
		console.error('Error sending email:', error.message)
		throw error
	}
}

module.exports = { sendEmail }
