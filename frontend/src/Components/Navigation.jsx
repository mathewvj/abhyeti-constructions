import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Navigation.css";

const Navigation = ({ refs }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation()
  const navigate = useNavigate()

  const scrollToRef = (ref) => {
    if(ref?.current){
      ref.current.scrollIntoView({ behaviour: "smooth"})
    }
  }

  const handleNavClick = (id) =>{
    setIsMenuOpen(false)
    if(id === "gallery"){
      navigate("/gallery")
    }else{
      if(location.pathname !== "/"){
        navigate("/")
        setTimeout(() => {
          scrollToRef(refs[`${id}Ref`])
        }, 100);
      }else{
        if(id === "home"){
          window.scrollTo({ top:0, behavior:"smooth"})
        }else{
          scrollToRef(refs[`${id}Ref`])
        }
      }
    }
  }

  const menuItems = [
    { name: "Home", id: "home" },
    { name: "Gallery", id: "gallery" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "FAQ", id: "faq" },
    { name: "Contact", id: "contact" },
  ];

  return (
     <nav className="nav-shadow">
      <div className="nav-container">
        <div className="nav-flex">
          <div className="nav-left">
            <h1 className="logo-text">Abhyeti Constructions</h1>
          </div>

          {/* Desktop menu */}
          <div className="menu-desktop">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`menu-button ${
                  location.pathname === "/gallery" && item.id === "gallery"
                    ? "active"
                    : location.pathname === "/" &&
                      item.id !== "gallery" &&
                      location.hash === `#${item.id}`
                    ? "active"
                    : ""
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-toggle"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="menu-mobile">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`menu-mobile-button ${
                location.pathname === "/gallery" && item.id === "gallery"
                  ? "active"
                  : ""
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
