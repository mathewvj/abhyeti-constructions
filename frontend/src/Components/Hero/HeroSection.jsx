import { ArrowRight } from "lucide-react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text-center">
          <h1 className="hero-title">Building Your Dreams Into Reality</h1>
          <p className="hero-subtitle">
            Professional construction services with excellence and innovation
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">
              Get Started <ArrowRight className="icon-arrow" />
            </button>
            <button className="btn-secondary">View Projects</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
