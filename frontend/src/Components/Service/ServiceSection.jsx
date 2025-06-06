import { Route  , Building, Construction  , ChevronRight } from "lucide-react";
import "./ServiceSection.css";
import { useNavigate } from "react-router-dom";

const ServiceSection = () => {
  const navigate = useNavigate()
  const services = [
    {
      icon: Route ,
      title: 'Road Construction',
      description: 'We build strong, long-lasting roads that connect communities and enable smooth transportation across Goa and beyond.'
    },
    {
      icon: Building,
      title: 'Building Construction',
      description: 'From homes to commercial spaces, we construct reliable, safe, and modern buildings tailored to every need.'
    },
    {
      icon: Construction  ,
      title: 'Bridge Construction',
      description: 'Our bridge projects stand for strength and stability—designed to endure and built to connect places and people safely.'
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
                <button className="service-learn-more-btn" onClick={()=> navigate("/gallery")}>
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
