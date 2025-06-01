import axios from "axios"
import { useEffect, useState } from "react"
import './AdminPanel.css' // Import the CSS file

const AdminPanel = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState("")
    const [projects, setProjects] = useState([])
    const [ editingProject, setEditingProject ] = useState(null)
    const [ imagesToKeep, setImagesToKeep] = useState(projects.images || [])
    const [showModal, setShowModal ] = useState(false)
    const [ showUploadModal, setShowUploadModal ] = useState(false) 
    const [ activeTab, setActiveTab ] = useState("road")
    const [editedData, setEditedData ] = useState(null)
    const [formData, setFormData] = useState({
        service: 'road',
        projectName: "",
        description: "",
        images: []
    })
    const categorizedProjects = {
        road : projects.filter(p => p.category === "road"),
        building : projects.filter(p => p.category === "building"),
        bridge : projects.filter(p => p.category === "bridge")
    }

    useEffect(() => {
        if (isLoggedIn) fetchProjects()
    }, [isLoggedIn])

    const fetchProjects = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/projects", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setProjects(res.data)
        } catch (error) {
            console.error("failed to fetch projects", error)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        try {
            const res = await axios.post("http://localhost:5000/api/admin/login", { email, password })
            setToken(res.data.token)
            setIsLoggedIn(true)
        } catch (error) {
            alert("login failed")
        }
    }

    const handleImageChange = (e) => {
        setFormData({ ...formData, images: Array.from(e.target.files) })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("category", formData.service)
        data.append("name", formData.projectName)
        data.append("description", formData.description)
        formData.images.forEach((file, index) => data.append("images", file))

        try {
            await axios.post("http://localhost:5000/api/projects/project-upload", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            alert("project uploaded successfully")
            fetchProjects()
            // Reset form
            setFormData({
                service: 'road',
                projectName: "",
                description: "",
                images: []
            })
            setShowUploadModal(false)
        } catch (error) {
            alert("upload failed")
        }
    }

    const handleEditClick = (project) =>{
        setEditingProject(project)
        setImagesToKeep([...project.images])
        setEditedData({
            service: project.category,
            projectName: project.name,
            description: project.description,
            newImages: []
        })
        setShowModal(true)
    }

    const handleDeleteImage = (image) =>{
        setImagesToKeep(prev => prev.filter(img => img !== image))
    }

    const handleUpdateImageChange = (e) =>{
        setEditedData({ ...editedData, newImages: Array.from(e.target.files)})
    }

    const handleUpdateSubmit = async(e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("category", editedData.service)
        data.append('name', editedData.projectName)
        data.append('description', editedData.description)
        
        
            imagesToKeep.forEach(img => data.append("keepImages", img))
        

        
            editedData.newImages.forEach(img => data.append("images", img))
        

        try {
            await axios.put(`http://localhost:5000/api/projects/${editingProject._id}`, data,{
                headers:{
                    Authorization: `Bearer ${token}`,
                "Content-Type" : "multipart/form-data"
                }
            })
            alert("project updated")
            setShowModal(false)
            fetchProjects()
        } catch (error) {
            alert("Failed to update projects") 
            console.log(error)  
        }
    }


    const handleDeleteProject = async(id) =>{
        if(!window.confirm("Are you sure, You want to delete this project?")) return

        try {
            await axios.delete(`http://localhost:5000/api/projects/${id}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            fetchProjects()
        } catch (error) {
            alert("Failed to delete projects")
        }
    }

    if (!isLoggedIn) {
        return (
            <div className="login-wrapper">
                <form onSubmit={handleLogin} className="login-form">
                    <h2 className="login-title">Admin Login</h2>
                    <div className="form-group">
                        <input 
                            name="email" 
                            type="email" 
                            placeholder="Enter your email" 
                            className="form-input" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            name="password" 
                            type="password" 
                            placeholder="Enter your password" 
                            className="form-input" 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login to Dashboard
                    </button>
                </form>
            </div>
        )
    }

    return (
        <div className="admin-container">
            <div className="main-panel">
                <div className="panel-header">
                    <h1 className="panel-title">Admin Dashboard</h1>
                    <p className="panel-subtitle">Manage your construction projects</p>
                </div>
                
                <div className="panel-content">
                    <button className="btn btn-primary" onClick={() => setShowUploadModal(true)}>
                                Upload New Project
                    </button>

                      {showUploadModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>Upload New Project</h2>
                            <form onSubmit={handleSubmit}>
                                <select
                                    value={formData.service}
                                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                    className="form-select"
                                >
                                    <option value="road">Road Construction</option>
                                    <option value="building">Building Construction</option>
                                    <option value="bridge">Bridge Construction</option>
                                </select>

                                <input
                                    type="text"
                                    placeholder="Project Name"
                                    value={formData.projectName}
                                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                                    className="form-input"
                                    required
                                />

                                <textarea
                                    placeholder="Project Description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="form-textarea"
                                    required
                                />

                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="file-input"
                                    required
                                />

                                <button type="submit" className="btn btn-success">Upload Project</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowUploadModal(false)}>Cancel</button>
                            </form>
                        </div>
                    </div>
                )}

                    {/* Upload Form Section */}
                    <div className="projects-section">
                        <div className="projects-header">
                            <h2 className="section-title">Uploaded Projects</h2>
                            
                        </div>

                        <div className="tabs">
                            {["road", "building", "bridge"].map(type => (
                                <button
                                    key={type}
                                    className={`tab-btn ${activeTab === type ? "active" : ""}`}
                                    onClick={() => setActiveTab(type)}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)} Construction
                                </button>
                            ))}
                        </div>

                        <div className="projects-grid">
                            {categorizedProjects[activeTab].length === 0 ? (
                                <p>No projects under {activeTab} category.</p>
                            ) : (
                                categorizedProjects[activeTab].map((project, index) => (
                                    <div key={index} className="project-card">
                                        <div className="project-header">
                                            <h3 className="project-title">{project.name}</h3>
                                            <span className="project-category">{project.category}</span>
                                        </div>
                                        <div className="project-actions">
                                            <button className="btn btn-secondary" onClick={() => handleEditClick(project)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteProject(project._id)}>Delete</button>
                                        </div>
                                        <p className="project-description">{project.description}</p>
                                        {project.images?.length > 0 && (
                                            <div className="project-images-grid">
                                                {project.images.map((url, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={`http://localhost:5000/uploads/${url}`}
                                                        alt={`${project.name} - Image ${idx + 1}`}
                                                        className="project-image"
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        {showModal && (
                        <div className="modal-overlay">
                            <div className="modal">
                                <h2>Edit Project</h2>
                                <form onSubmit={handleUpdateSubmit}>
                                    <select
                                        value={editedData.service}
                                        onChange={(e) => setEditedData({ ...editedData, service: e.target.value })}
                                        className="form-select"
                                    >
                                        <option value="road">Road Construction</option>
                                        <option value="building">Building Construction</option>
                                        <option value="bridge">Bridge Construction</option>
                                    </select>

                                    <input
                                        type="text"
                                        value={editedData.projectName}
                                        onChange={(e) => setEditedData({ ...editedData, projectName: e.target.value })}
                                        className="form-input"
                                        placeholder="Project Name"
                                        required
                                    />

                                    <textarea
                                        value={editedData.description}
                                        onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                                        className="form-textarea"
                                        required
                                    />

                                    <div className="project-images-grid">
                                        {imagesToKeep.map((img, idx) => (
                                            <div key={idx} style={{ position: "relative" }}>
                                                <img
                                                    src={`http://localhost:5000/uploads/${img}`}
                                                    alt="preview"
                                                    className="project-image"
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDeleteImage(img)}
                                                    style={{ position: "absolute", top: 0, right: 0 }}
                                                >X</button>
                                            </div>
                                        ))}
                                    </div>

                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleUpdateImageChange}
                                        className="file-input"
                                    />

                                    <button type="submit" className="btn btn-primary">Update</button>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    )}
                                    </div>
                                    
                                ))

                                
                            )}
                            
                        </div>
                    </div>

                  

                    
                    
                </div>
            </div>
        </div>
    )
}

export default AdminPanel