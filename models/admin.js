const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: [3, 'Name must to more 3 letter']
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    userType: {
      type: String,
      required: true,
      enum: ['admin']
    }
  },
  {
    timestamps: true
  }
)

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin
