import { useState } from "react";
import { Phone, MapPin, Mail } from "lucide-react";
import "./ContactSection.css";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted", formData);
    alert("Thank You! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section className="contact-section">
      <div className="container">
        {/* Header */}
        <div className="contact-header">
          <h2>Contact Us</h2>
          <p>
            Ready to start your construction project? Get in touch with us
            today.
          </p>
        </div>

        {/* Content Grid */}
        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <Phone className="contact-info-icon" />
                <div>
                  <div className="contact-info-title">Phone</div>
                  <div className="contact-info-detail">+91 98765 43210</div>
                </div>
              </div>

              <div className="contact-info-item">
                <Mail className="contact-info-icon" />
                <div>
                  <div className="contact-info-title">Email</div>
                  <div className="contact-info-detail">
                    info@abhyeticonstructions.com
                  </div>
                </div>
              </div>

              <div className="contact-info-item">
                <MapPin className="contact-info-icon" />
                <div>
                  <div className="contact-info-title">Address</div>
                  <div className="contact-info-detail">
                    123 Construction Avenue, Building City, State 12345
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
