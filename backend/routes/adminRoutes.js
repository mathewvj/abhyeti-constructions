const express = require('express')
const router = express.Router()
const { loginAdmin, requestResetPassword, resetPassword } = require('../controllers/adminController')

router.post('/login', loginAdmin)
router.post('/request-reset-password', requestResetPassword)
router.post('/reset-password',resetPassword)

module.exports = router
