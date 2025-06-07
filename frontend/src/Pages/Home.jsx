import { useEffect } from "react";
import AboutSection from "../Components/About/AboutSection";
import ContactSection from "../Components/Contact/ContactSection";
import FaqSection from "../Components/Faq/FaqSection";
import HeroSection from "../Components/Hero/HeroSection";
import ServiceSection from "../Components/Service/ServiceSection";

const HomePage = ({ aboutRef, servicesRef, contactRef, faqRef }) => {

  useEffect(()=>{
    fetchProjects()
  },[])

  const fetchProjects = async() =>{
    try {
      await axios.get("https://abhyeti-constructions-backend.onrender.com/api/projects")

    } catch (error) {
      console.error("failed to fetch projects", error)
    }
  }
  return (
    <div>
      <div>
        <HeroSection aboutRef={aboutRef} />
      </div>

      <div ref={aboutRef}>
        <AboutSection />
      </div>

      <div ref={servicesRef}>
        <ServiceSection />
      </div>

      <div ref={faqRef}>
        <FaqSection />
      </div>

      <div ref={contactRef}>
        <ContactSection />
      </div>
    </div>
  );
};

export default HomePage;
