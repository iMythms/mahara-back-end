const mongoose = require('mongoose')

const FreelancerUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profilePicture: {
      type: String,
      default: null
    },
    categories: {
      type: [String],
      default: []
    },
    numberOfRatings: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 1,
      max: 5
    }
  },
  {
    timestamps: true
  }
)

FreelancerUserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.password
  }
})

const FreelancerUser = mongoose.model('FreelancerUser', FreelancerUserSchema)

module.exports = FreelancerUser
