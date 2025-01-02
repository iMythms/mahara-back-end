const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// Importing Routes
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const wishlistRouter = require('./routes/wishlist')
const applicationRouter = require('./routes/applications')

// Middleware
const { verifyToken } = require('./middleware/jwtUtils')

dotenv.config()

const app = express()
const PORT = process.env.PORT

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
	console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

app.use(express.json())
app.use(
	cors({
		origin: 'http://localhost:5173', // Frontend port
	})
)

// Routes go here
app.use('/auth', authRouter)
app.use('/user', verifyToken, userRouter)
app.use('/wishlist', verifyToken, wishlistRouter)
app.use('/applications', verifyToken, applicationRouter)

app.listen(PORT, () => {
	console.log(`Running on http://localhost:${PORT}`)
})
