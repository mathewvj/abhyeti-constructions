const Project = require('../models/Project')

exports.uploadProject = async (req, res) =>{
    const { name, description, category } = req.body

    try {
        if(!req.files || req.files.length < 1){
            return res.status(400).json({ message: 'At least one image is required'})
        }

        const imagePaths = req.files.map(file => file.filename)

        const newProject = new Project({
            name,
            description,
            category,
            images: imagePaths
        })

        await newProject.save()
        res.status(201).json({ message: 'project updated', project: newProject})
    } catch (error) {
        res.status(500).json({ message:'Upload failed', error: error.message})
    }
}

exports.getProjects = async(req,res)=>{
    try {
        const projects = await Project.find().sort({ createdAt: -1 })
        res.json(projects)
    } catch (error) {
        res.status(500).json({ message:'Failed to fetch products'})
    }
}