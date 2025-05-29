const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const upload = require('../config/multer')
const { getProjects, uploadProject } = require('../controllers/projectController')


router.post('/project-upload', auth, upload.array('images', 3), uploadProject)
router.get('/', getProjects)

module.exports = router