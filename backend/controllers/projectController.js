const Project = require('../models/Project')
const cloudinary = require('../config/cloudinary')
const fs = require('fs')
const path = require('path')

exports.uploadProject = async (req, res) =>{
    const { name, description, category } = req.body

    try {
        if(!req.files || req.files.length < 1){
            return res.status(400).json({ message: 'At least one image is required'})
        }

        const imageUrls = req.files.map(file => file.path)

        const newProject = new Project({
            name,
            description,
            category,
            images: imageUrls
        })

        await newProject.save()
        res.status(201).json({ message: 'project updated', project: newProject})
    } catch (error) {
        console.error('Upload error',error)
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

        for(const imgUrl of project.images){
            const segments = imgUrl.split('/')
            const filename = segments.pop()
            const publicId = segments.slice(segments.indexOf('upload')+ 1).join('/') + '/' + filename.split('.')[0]

            await cloudinary.uploader.destroy(publicId)
        }

        await Project.findByIdAndDelete(req.params.id)
        res.json({ message: 'Project deleted successfully'})
    } catch (error) {
        console.error('Delete error',error)
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

        //upload new images to Cloudinary

        const newImageUrls = []

        if(req.files && req.files.length > 0) {
            for(const file of req.files){
                const result = await cloudinary.uploader.upload(file.path,{
                    folder: 'abhyeti-projects',
                })
                newImageUrls.push(result.secure_url)
            }
        }

        const totalImages = keepImages.length + newImageUrls.length
        if(totalImages > 3){
            for(const url of newImageUrls){
                const publicId = getPublicIdFromUrl(url)
                await cloudinary.uploader.destroy(publicId)
            }
            return res.status(400).json({ message: 'Cannot upload more than 3 images'})
        }

        const imagesToDelete = project.images.filter(img => !keepImages.includes(img))
        for(const imgUrl of imagesToDelete){
            const publicId = getPublicIdFromUrl(imgUrl)
            await cloudinary.uploader.destroy(publicId)
        }

        project.name = name;
        project.category = category;
        project.description = description;
        project.images = [...keepImages, ...newImageUrls];

        await project.save();
        res.json({ message: "Project updated successfully", project });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating project", error });
    }
}

function getPublicIdFromUrl(url){
    const parts = url.split('/')
    const filename = parts.pop()
    const publicId = parts.slice(parts.indexOf('upload') +1).join('/') + '/' + filename.split('.')[0]
    return publicId    
}