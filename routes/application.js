const express = require('express')
const {
  GetApplication,
  CreateApplication,
  UpdateApplication,
  DeleteApplication
} = require('../controllers/application')

const router = express.Router()

router.get('/applications', GetApplication)
router.post('/applications', CreateApplication)
router.put('/applications/:id', UpdateApplication)
router.delete('/applications/:id', DeleteApplication)

module.exports = router
