import { useEffect, useState } from "react";
import axios from 'axios'
import "./Gallery.css";
import { ChevronLeft, ChevronRight, X, Eye } from "lucide-react";


const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState('road');
  const [projects, setProjects ] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [ selectedImage, setSelectedImage ] = useState(null)
  const [carouselIndexes, setCarouselIndexes ] = useState({})

   const categorizedProjects = {
    road: projects.filter((p) => p.category === 'road'),
    Building: projects.filter((p) => p.category === 'building'),
    bridge: projects.filter((p) => p.category === 'bridge')
  }

  const projectsPerPage = 4
  const projectsForCurrentTab = categorizedProjects[activeTab] || []

  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = projectsForCurrentTab.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(projectsForCurrentTab.length / projectsPerPage)
  useEffect(()=>{
    fetchProjects()
    setCurrentPage(1)
  },[activeTab])

  const fetchProjects = async() =>{
    try {
      const res = await axios.get("http://localhost:5000/api/projects")

      setProjects(res.data)
    } catch (error) {
      console.error("failed to fetch projects", error)
    }
  }

  const nextImage = (projectIndex) =>{
    const project = currentProjects[projectIndex]
    setCarouselIndexes(prev =>({
      ...prev,
      [projectIndex] : ((prev[projectIndex] || 0) + 1) % project.images.length
    }))
  }

  const prevImage = (projectIndex) =>{
    const project = currentProjects[projectIndex]
    setCarouselIndexes(prev =>({
      ...prev,
      [projectIndex] : ((prev[projectIndex] || 0) - 1 + project.images.length) % project.images.length
    }))
  }

  const openFullscreen = (imageSrc) => {
    setSelectedImage(imageSrc)
  }

  const closeFullscreen = () => {
    setSelectedImage(null)
  }

  const getImageSrc = (url) => {
    return `http://localhost:5000/uploads/${url}`
  }

  return (
    <div className="gallery-page">
      <header className="gallery-header">
        <h1 className="gallery-title">Our Project Gallery</h1>
        <p className="gallery-subtitle">Explore our portfolio of successful construction projects</p>
      </header>

      <nav className="gallery-tabs">
        {["road","building", "bridge"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Construction
          </button>
        ))}
      </nav>

      <section className="gallery-grid">
        {currentProjects.length === 0 ?(
          <p>No Project under {activeTab} Category.</p>
        ):(
          currentProjects.map((project, index) => {
            const currentImageIndex = carouselIndexes[index] || 0;
            const currentImage = project.images[currentImageIndex]
          return (
              <article key={index} className="gallery-card">
                <div className="carousel-container">
                  <img 
                    src={getImageSrc(currentImage)} 
                    alt={`${project.name} - image ${currentImageIndex + 1}`} 
                    className="carousel-image"
                  />
                  
                  {project.images.length > 1 && (
                    <>
                      <button 
                        className="carousel-nav carousel-prev"
                        onClick={() => prevImage(index)}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      
                      <button 
                        className="carousel-nav carousel-next"
                        onClick={() => nextImage(index)}
                      >
                        <ChevronRight size={20} />
                      </button>
                      
                      <div className="carousel-indicators">
                        {project.images.map((_, idx) => (
                          <div
                            key={idx}
                            className={`indicator ${idx === currentImageIndex ? 'active' : ''}`}
                            onClick={() => setCarouselIndexes(prev => ({
                              ...prev,
                              [index]: idx
                            }))}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  
                  <button 
                    className="view-fullscreen"
                    onClick={() => openFullscreen(getImageSrc(currentImage))}
                  >
                    <Eye size={16} />
                  </button>
                </div>
                
                <div className="gallery-info">
                  <h3 className="gallery-project-title">{project.name}</h3>
                  <p className="gallery-description">{project.category} Construction</p>
                </div>
              </article>
            );
})
        )}
                {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <ChevronLeft size={16} />
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
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

      </section>
      {selectedImage && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <img 
            src={selectedImage} 
            alt="Fullscreen view" 
            className="fullscreen-image"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="close-fullscreen" onClick={closeFullscreen}>
            <X size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
