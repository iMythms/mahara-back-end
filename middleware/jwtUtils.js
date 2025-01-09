const jwt = require('jsonwebtoken')

const signToken = (user) => {
	const token = jwt.sign(
		{
			_id: user._id,
			role: user.role, // Ensure role is included here
		},
		process.env.JWT_SECRET
	)
	return token
}

const verifyToken = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization

		// Check if Authorization header is missing or invalid
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res
				.status(401)
				.json({ error: 'Authorization header is missing or invalid.' })
		}

		// Extract the token
		const token = authHeader.split('Bearer ')[1]

		// Verify the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		// Attach decoded payload to the request
		req.user = decoded

		// Proceed to the next middleware or route handler
		next()
	} catch (error) {
		res.status(401).json({ error: 'Invalid token.' })
	}
}

module.exports = {
	signToken,
	verifyToken,
}
