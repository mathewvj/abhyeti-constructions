import { Award } from "lucide-react";
import "./AboutSection.css";

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <h2 className="about-title">About Abhyeti Constructions</h2>
            <p className="about-paragraph">
              With over a decade of experience in the construction industry, Abhyeti Constructions 
              has been at the forefront of delivering exceptional building solutions that combine 
              innovation with traditional craftsmanship.
            </p>
            <p className="about-paragraph">
              Our commitment to quality, safety, and customer satisfaction has made us a trusted 
              partner for residential, commercial, and infrastructure projects across the region.
            </p>
            <div className="about-stats">
              <div className="about-stat-item">
                <div className="about-stat-number">500+</div>
                <div className="about-stat-label">Projects Completed</div>
              </div>
              <div className="about-stat-item">
                <div className="about-stat-number">15+</div>
                <div className="about-stat-label">Years Experience</div>
              </div>
            </div>
          </div>
          <div className="about-image-container">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop" 
              alt="Construction team"
              className="about-image"
            />
            <div className="quality-badge">
              <Award className="quality-icon" />
              <div className="quality-text">Quality Assured</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
