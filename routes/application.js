const express = require('express')
const {
  GetApplication,
  CreateApplication,
  UpdateApplication,
  DeleteApplication
} = require('../controllers/application')

const { verifyToken } = require('../middleware/auth')

const router = express.Router()

router.get('/applications', verifyToken, GetApplication)
router.post('/applications', verifyToken, CreateApplication)
router.put('/applications/:id', verifyToken, UpdateApplication)
router.delete('/applications/:id', verifyToken, DeleteApplication)

module.exports = router
