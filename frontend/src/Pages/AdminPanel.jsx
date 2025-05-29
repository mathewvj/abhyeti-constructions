import axios from "axios"
import { useEffect, useState } from "react"

const AdminPanel = () =>{
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ token, setToken ] = useState("")
    const [ projects, setProjects ] = useState([])
    const [ formData, setFormData ] = useState({
        service: 'road',
        projectName: "",
        description: "",
        images: []
    })
    useEffect(()=>{
        if(isLoggedIn) fetchProjects()
    },[isLoggedIn])

    const fetchProjects = async() =>{
        try {
            const res = await axios.get("http://localhost:5000/api/projects",{
                headers:{
                    Authorization:  `Bearer ${token}`
                }
            })
            setProjects(res.data)
        } catch (error) {
            console.error("failed to fetch projects",error)
        }
    }

    const handleLogin = async(e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        try {
            const res = await axios.post("http://localhost:5000/api/admin/login", {email, password})
            setToken(res.data.token)
            setIsLoggedIn(true)
        } catch (error) {
            alert("login failed")
        }
    }

    const handleImageChange = (e) =>{
        setFormData({ ...formData, images: Array.from(e.target.files)})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const data = new FormData()
        data.append("category", formData.service)
        data.append("name", formData.projectName)
        data.append("description", formData.description)
        formData.images.forEach((file, index) => data.append("images", file))

        try {
            await axios.post("http://localhost:5000/api/projects/project-upload",data,{
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            alert("project uploaded successfully")
            fetchProjects()

        } catch (error) {
            alert("upload failed")
        }
    }

    if(!isLoggedIn){
        return (
        <form onSubmit={handleLogin} className="p-4">
            <h2 className="text-xl font-bold mb-2">Admin Login</h2>
            <input name="email" type="email" placeholder="Email" className="block mb-2 p-2 border" required />
            <input name="password" type="password" placeholder="Password" className="block mb-2 p-2 border" required />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">Login</button>
        </form>
        )
    }

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="mb-8">
            <h2 className="text-xl font-bold mb-4">Upload Project</h2>
            <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="block mb-2 p-2 border">
            <option value="road">Road Construction</option>
            <option value="building">Building Construction</option>
            <option value="bridge">Bridge Construction</option>
            </select>
            <input
            type="text"
            placeholder="Project Name"
            value={formData.projectName}
            onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
            className="block mb-2 p-2 border"
            required
            />
            <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="block mb-2 p-2 border"
            required
            />
            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="block mb-2" required />
            <button type="submit" className="bg-green-600 text-white px-4 py-2">Upload Project</button>
        </form>

        <div>
        <h2 className="text-xl font-bold mb-4">Uploaded Projects</h2>
        {projects.map((project, index) => (
          <div key={index} className="mb-6 p-4 border rounded">
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p className="text-sm italic mb-2">{project.category.toUpperCase()}</p>
            <p>{project.description}</p>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {project.images.map((url, idx) => (
                <img key={idx} src={`http://localhost:5000/uploads/${url}`} alt="project" style={{width:'20px' , height:'30px'}} className="w-30 h-40 object-cover rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>
        </div>
    )
    

}

export default AdminPanel