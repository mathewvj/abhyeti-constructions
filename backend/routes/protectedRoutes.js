const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const upload = require('../config/multer')
const { getProjects, uploadProject, updateProject, deleteProject } = require('../controllers/projectController')


router.post('/project-upload', auth, upload.array('images', 3), uploadProject)
router.get('/', getProjects)
router.put('/:id',auth,upload.array('images', 3),updateProject)
router.delete('/:id',auth, deleteProject)


module.exports = router