const express = require('express')
const router = express.Router()
const { loginAdmin, devLogin } = require('../controllers/adminController')

router.post('/login', loginAdmin)
router.post('/dev-login', devLogin)

module.exports = router
