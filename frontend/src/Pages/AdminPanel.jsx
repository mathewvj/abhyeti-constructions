import axios from "axios";
import { useEffect, useState } from "react";
import LoginForm from "../Components/AdminComponents/LoginForm";
import UploadProjectModal from "../Components/AdminComponents/UploadProjectModel";
import EditProjectModal from "../Components/AdminComponents/EditProjectModal";
import "./AdminPanel.css"; // Import the CSS file
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [imagesToKeep, setImagesToKeep] = useState(projects.images || []);
  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeTab, setActiveTab] = useState("road");
  const [editedData, setEditedData] = useState(null);
  const [formData, setFormData] = useState({
    service: "road",
    projectName: "",
    description: "",
    images: [],
  });

  const categorizedProjects = {
    road: projects.filter((p) => p.category === "road"),
    building: projects.filter((p) => p.category === "building"),
    bridge: projects.filter((p) => p.category === "bridge"),
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;
  const projectsForCurrentTab = categorizedProjects[activeTab] || [];

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projectsForCurrentTab.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(projectsForCurrentTab.length / projectsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  useEffect(() => {
    if (isLoggedIn) fetchProjects();
  }, [isLoggedIn]);

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(res.data);
    } catch (error) {
      console.error("failed to fetch projects", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });
      setToken(res.data.token);
      setIsLoggedIn(true);
      localStorage.setItem("adminToken", res.data.token);
    } catch (error) {
      alert("login failed");
    }
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("category", formData.service);
    data.append("name", formData.projectName);
    data.append("description", formData.description);
    formData.images.forEach((file, index) => data.append("images", file));

    try {
      await axios.post(
        "http://localhost:5000/api/projects/project-upload",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("project uploaded successfully");
      fetchProjects();
      // Reset form
      setFormData({
        service: "road",
        projectName: "",
        description: "",
        images: [],
      });
      setShowUploadModal(false);
    } catch (error) {
      alert("upload failed");
    }
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setImagesToKeep([...project.images]);
    setEditedData({
      service: project.category,
      projectName: project.name,
      description: project.description,
      newImages: [],
    });
    setShowModal(true);
  };

  const handleDeleteImage = (image) => {
    setImagesToKeep((prev) => prev.filter((img) => img !== image));
  };

  const handleUpdateImageChange = (e) => {
    setEditedData({ ...editedData, newImages: Array.from(e.target.files) });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("category", editedData.service);
    data.append("name", editedData.projectName);
    data.append("description", editedData.description);

    imagesToKeep.forEach((img) => data.append("keepImages", img));
    editedData.newImages.forEach((img) => data.append("images", img));

    try {
      await axios.put(
        `http://localhost:5000/api/projects/${editingProject._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("project updated");
      setShowModal(false);
      fetchProjects();
    } catch (error) {
      alert("Failed to update projects");
      console.log(error);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure, You want to delete this project?"))
      return;

    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProjects();
    } catch (error) {
      alert("Failed to delete projects");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken("");
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  if (!isLoggedIn) return <LoginForm onLogin={handleLogin} />;

  return (
    <div className="admin-container">
      <div className="main-panel">
        <button
          className="btn btn-danger d-flex align-items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </button>
        <div className="panel-header">
          <h1 className="panel-title">Admin Dashboard</h1>
          <p className="panel-subtitle">Manage your construction projects</p>
        </div>

        <div className="panel-content">
          <button
            className="btn btn-primary"
            onClick={() => setShowUploadModal(true)}
          >
            Upload New Project
          </button>

          {showUploadModal && (
            <UploadProjectModal
              formData={formData}
              onChange={setFormData}
              onFileChange={handleImageChange}
              onClose={() => setShowUploadModal(false)}
              onSubmit={handleSubmit}
            />
          )}

          {/* Upload Form Section */}
          <div className="projects-section">
            <div className="projects-header">
              <h2 className="section-title">Uploaded Projects</h2>
            </div>

            <div className="tabs">
              {["road", "building", "bridge"].map((type) => (
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
              {currentProjects.length === 0 ? (
                <p>No projects under {activeTab} category.</p>
              ) : (
                currentProjects.map((project, index) => (
                  <div key={index} className="project-card">
                    <div className="project-header">
                      <h3 className="project-title">{project.name}</h3>
                      <span className="project-category">
                        {project.category}
                      </span>
                    </div>
                    <div className="project-actions">
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleEditClick(project)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteProject(project._id)}
                      >
                        Delete
                      </button>
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

                   
                  </div>
                )))}
               {showModal && (
                      <EditProjectModal
                        editedData={editedData}
                        imagesToKeep={imagesToKeep}
                        onChange={setEditedData}
                        onImageDelete={handleDeleteImage}
                        onImageChange={handleUpdateImageChange}
                        onClose={() => setShowModal(false)}
                        onUpdate={handleUpdateSubmit}
                      />
                )}

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    Prev
                  </button>
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      className={currentPage === idx + 1 ? "active" : ""}
                      onClick={() => setCurrentPage(idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
