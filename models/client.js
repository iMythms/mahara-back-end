const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema(
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
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Freelance'
      }
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Freelance'
      }
    ]
  },
  {
    timestamps: true
  }
)

const Client = mongoose.model('Client', ClientSchema)

module.exports = Client
