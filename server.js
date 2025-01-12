require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// Importing Routes
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const wishlistRouter = require('./routes/wishlist')
const applicationRouter = require('./routes/applications')
const jobsRouter = require('./routes/jobs')
const galleryRouter = require('./routes/gallery')
const contactUsRouter = require('./routes/contactUs')
const emailTestRouter = require('./routes/emailTest')

// Middleware
const { verifyToken } = require('./middleware/jwtUtils')

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
		origin: process.env.FRONT_END_URL,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	})
)

// Routes go here
app.use('/auth', authRouter)
app.use('/user', verifyToken, userRouter)
app.use('/wishlist', verifyToken, wishlistRouter)
app.use('/applications', verifyToken, applicationRouter)
app.use('/jobs', verifyToken, jobsRouter)
app.use('/gallery', verifyToken, galleryRouter)
app.use('/contactUs', contactUsRouter)

// Test email notification route
app.use('/email-test', emailTestRouter)

// Routes not found
// app.use((req, res, next) => {
// 	res.status(404).json({ error: 'Route not found' })
// })

app.listen(PORT, () => {
	console.log(`Running on http://localhost:${PORT}`)
})
