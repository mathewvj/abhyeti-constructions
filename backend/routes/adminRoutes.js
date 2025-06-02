const express = require('express')
const router = express.Router()
const { loginAdmin, devLogin, requestResetPassword, resetPassword } = require('../controllers/adminController')

router.post('/login', loginAdmin)
router.post('/dev-login', devLogin)
router.post('/request-reset-password', requestResetPassword)
router.post('/reset-password',resetPassword)

module.exports = router
