import { Building, Users, Award, ChevronRight } from "lucide-react";
import "./ServiceSection.css";

const ServiceSection = () => {
  const services = [
    {
      icon: Building,
      title: 'Residential Construction',
      description: 'Custom homes, apartments, and residential complexes built with precision and care.'
    },
    {
      icon: Users,
      title: 'Commercial Projects',
      description: 'Office buildings, retail spaces, and commercial facilities designed for success.'
    },
    {
      icon: Award,
      title: 'Infrastructure Development',
      description: 'Roads, bridges, and public infrastructure projects that serve communities.'
    }
  ];

  return (
    <section className="service-section">
      <div className="container">
        <div className="service-header">
          <h2 className="service-title">Our Services</h2>
          <p className="service-subtitle">
            We offer comprehensive construction services tailored to meet your specific needs and requirements.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="service-card">
                <div className="service-icon-wrapper">
                  <Icon className="service-icon" />
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>
                <button className="service-learn-more-btn">
                  Learn More <ChevronRight className="service-chevron" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
