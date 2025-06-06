import { Star } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand & Description */}
          <div className="footer-brand">
            <h3 className="footer-title">Abhyeti Construction Private Limited</h3>
            <p className="footer-description">
              Building excellence with innovation and traditional craftsmanship. 
              Your trusted partner for all construction needs.
            </p>
            <div className="footer-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="star-icon" />
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Services</h4>
            <ul className="footer-list">
              <li>Road Construction</li>
              <li>Bridge Construction</li>
              <li>Building Construction</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Contact Info</h4>
            <ul className="footer-list">
              <li>+91 9158220313</li>
              <li>abhyeticonstruction3378@gmail.com</li>
              <li>Bella Vista waddo, Sirsaim, Thivim </li>
              <li>Berdez, North-Goa, 403502</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Abhyeti Constructions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
