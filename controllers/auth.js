const bcrypt = require('bcrypt')
const { signToken } = require('../middleware/jwtUtils')
const AdminUser = require('../models/adminUser')
const ClientUser = require('../models/clientUser')
const FreelancerUser = require('../models/freelancerUser')

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body

    // Determine which user based on the role
    let UserModel
    switch (role) {
      case 'admin':
        UserModel = AdminUser
        break
      case 'client':
        UserModel = ClientUser
        break
      case 'freelancer':
        UserModel = FreelancerUser
        break
      default:
        return res.status(400).json({ error: 'Invalid user role.' })
    }

    // Find user by email
    const user = await UserModel.findOne({ email })
    if (!user) {
      console.log(error)
      return res.status(404).json({ error: 'User not found.' })
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    // Generate JWT token
    const token = signToken(user)

    // Return success response
    res.status(200).json({
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' })
  }
}

// Register Controller
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // Determine which user model to use based on role
    let UserModel
    switch (role) {
      case 'admin':
        UserModel = AdminUser
        break
      case 'client':
        UserModel = ClientUser
        break
      case 'freelancer':
        UserModel = FreelancerUser
        break
      default:
        return res.status(400).json({ error: 'Invalid user role.' })
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create newUser
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword
    })
    await newUser.save()

    // Generate JWT Token
    const token = signToken(newUser)

    // Return success response
    res.status(201).json({
      message: 'Registration successful.',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}

module.exports = {
  login,
  register
}
