const express = require('express')
const {
	addToWishlist,
	removeFromWishlist,
	getWishlist,
} = require('../controllers/wishlist')
const router = express.Router()

router.post('/', addToWishlist)

router.delete('/:freelancerId', removeFromWishlist)

router.get('/', getWishlist)

module.exports = router
