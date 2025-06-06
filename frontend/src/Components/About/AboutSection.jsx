import { Award } from "lucide-react";
import "./AboutSection.css";

const AboutSection = () => {
  return (
    <section className="about-section" id="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <h2 className="about-title">About Abhyeti Constructions</h2>
            <p className="about-paragraph">
              Welcome to <strong>Abhyeti Construction Private Limited</strong>, a trusted name in infrastructure development based in the heart of Goa. With over 2 years of experience, we specialize in delivering high-quality Road, Bridge, and Building construction projects that meet both modern standards and local needs.
            </p>
            <p className="about-paragraph">
              At Abhyeti, we are driven by a passion for building not just structures, but strong foundations for communities. Whether it's a durable road, a reliable bridge, or a safe and functional building, our work reflects our commitment to quality, safety, and timely delivery.
            </p>
            <div className="about-stats">
              {/* <div className="about-stat-item">
                <div className="about-stat-number">500+</div>
                <div className="about-stat-label">Projects Completed</div>
              </div> */}
              <div className="about-stat-item">
                <div className="about-stat-number">2+</div>
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
