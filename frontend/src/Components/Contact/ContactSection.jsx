import { useState } from "react";
import { Phone, MapPin, Mail } from "lucide-react";
import "./ContactSection.css";
import axios from "axios";

const ContactSection = () => {
  const [ isSubmit, setIsSubmit] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // clear error on change
  };

  const validate = () => {
    const newErrors = {};
    const { name, email, phone, message } = formData;

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format.";

    if (phone && !/^[6-9]\d{9}$/.test(phone)) newErrors.phone = "Enter a valid 10-digit phone number.";

    if (!message.trim()) newErrors.message = "Message is required.";
    else if (message.length < 10) newErrors.message = "Message should be at least 10 characters.";

    return newErrors;
  };

  const handleSubmit = async () => {
    setIsSubmit(true)
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmit(false)
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/contact/send`, formData);
      alert("Thank you! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("Message failed to send:", error);
      alert("Something went wrong. Please try again later.");
    } finally{
      setIsSubmit(false)
    }
  };

  return (
    <section className="contact-section">
      <div className="container">
        <div className="contact-header">
          <h2>Contact Us</h2>
          <p>
            Ready to start your construction project? Get in touch with us today.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <Phone className="contact-info-icon" />
                <div>
                  <div className="contact-info-title">Phone</div>
                  <div className="contact-info-detail">+91 9158220313</div>
                </div>
              </div>
              <div className="contact-info-item">
                <Mail className="contact-info-icon" />
                <div>
                  <div className="contact-info-title">Email</div>
                  <div className="contact-info-detail">
                    abhyeticonstruction3378@gmail.com
                  </div>
                </div>
              </div>
              <div className="contact-info-item">
                <MapPin className="contact-info-icon" />
                <div>
                  <div className="contact-info-title">Address</div>
                  <div className="contact-info-detail">
                    Bella Vista waddo, Sirsaim, Thivim, Berdez, North-Goa, 403502
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
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
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
              />
              {errors.message && <p className="error-text">{errors.message}</p>}
            </div>

            <button type="submit" className="submit-button" disabled={isSubmit}>
              {isSubmit ? <span className='spinner'></span> : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
