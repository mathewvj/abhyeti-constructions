const { error } = require('console')
const Project = require('../models/Project')
const fs = require('fs')
const path = require('path')

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

exports.deleteProject = async(req,res) =>{
    try {
        const project = await Project.findById(req.params.id)
        if(!project) return res.status(404).json({ message: 'Project not found'})

        project.images.forEach(imgPath =>{
            const filePath = path.join(__dirname, '../uploads', imgPath)
            fs.unlink(filePath, err =>{
                if(err) console.error('falied to delete image', err)
            })
        })

        await Project.findByIdAndDelete(req.params.id)
        res.json({ message: 'Project deleted successfully'})
    } catch (error) {
        res.status(500).json({ message:'Error deleting project', error: error.message})
    }
}

exports.updateProject = async( req, res ) =>{
    try {
        const { name, description, category, imagesTokeep } = req.body

         let keepImages = req.body.keepImages || [];
        if (!Array.isArray(keepImages)) {
            keepImages = [keepImages];
        }

        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const newImagePaths = req.files?.map(file => file.filename) || [];
        const totalImages = keepImages.length + newImagePaths.length;

        if (totalImages > 3) {
            newImagePaths.forEach(img => {
                const fullPath = path.join(__dirname, '../uploads', img);
                fs.unlink(fullPath, () => {});
            });
            return res.status(400).json({ message: 'Cannot exceed 3 images per project' });
        }

        const imagesToDelete = project.images.filter(img => !keepImages.includes(img));
        imagesToDelete.forEach(img => {
            const fullPath = path.join(__dirname, '../uploads', img);
            fs.unlink(fullPath, err => {
                if (err) console.error('Error deleting image', err);
            });
        });

        project.name = name;
        project.category = category;
        project.description = description;
        project.images = [...keepImages, ...newImagePaths];

        await project.save();
        res.json({ message: "Project updated successfully", project });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating project", error });
    }
}