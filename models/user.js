const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Integer,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true,
      minlength: [3, 'Name must to more 3 letter']
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, 'Email must to more 3 letter']
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'client', 'freelancer']
    },
    profile_picture: {
      type: String,
      required: true
    },
    categories: {
      type: String,
      required: true,
      enum: [
        'logo design',
        'software development',
        'video editing',
        'website development',
        'social media marketing',
        'architecture & interior design'
      ]
    },
    rating: {
      type: Integer
    },
    wishlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      maxLength: [10, 'Client must wish min than 10']
    },
    is_active: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
