import { useState } from "react";
import "./Gallery.css";

const mockGalleryData = {
  residential: [
    { id: 1, title: 'Modern Villa', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=400&fit=crop', description: 'Luxury residential project' },
    { id: 2, title: 'Apartment Complex', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=400&fit=crop', description: 'Multi-story residential building' },
    { id: 3, title: 'Family Home', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=500&h=400&fit=crop', description: 'Contemporary family residence' },
  ],
  commercial: [
    { id: 4, title: 'Office Building', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop', description: 'Modern office complex' },
    { id: 5, title: 'Shopping Mall', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=400&fit=crop', description: 'Commercial retail space' },
    { id: 6, title: 'Corporate HQ', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=400&fit=crop', description: 'Corporate headquarters' },
  ],
  infrastructure: [
    { id: 7, title: 'Bridge Construction', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop', description: 'Infrastructure development' },
    { id: 8, title: 'Road Development', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&h=400&fit=crop', description: 'Highway construction' },
    { id: 9, title: 'Public Facility', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&h=400&fit=crop', description: 'Public infrastructure' },
  ]
};

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState('residential');

  const tabs = [
    { id: 'residential', name: 'Residential', data: mockGalleryData.residential },
    { id: 'commercial', name: 'Commercial', data: mockGalleryData.commercial },
    { id: 'infrastructure', name: 'Infrastructure', data: mockGalleryData.infrastructure }
  ];

  const currentTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="gallery-page">
      <header className="gallery-header">
        <h1 className="gallery-title">Our Project Gallery</h1>
        <p className="gallery-subtitle">Explore our portfolio of successful construction projects</p>
      </header>

      <nav className="gallery-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.name}
          </button>
        ))}
      </nav>

      <section className="gallery-grid">
        {currentTabData && currentTabData.data.map(project => (
          <article key={project.id} className="gallery-card">
            <img src={project.image} alt={project.title} className="gallery-image" />
            <div className="gallery-info">
              <h3 className="gallery-project-title">{project.title}</h3>
              <p className="gallery-description">{project.description}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default GalleryPage;
