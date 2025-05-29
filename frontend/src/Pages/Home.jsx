import AboutSection from "../Components/AboutSection";
import ContactSection from "../Components/ContactSection";
import FaqSection from "../Components/FaqSection";
import HeroSection from "../Components/HeroSection";
import ServiceSection from "../Components/ServiceSection";

const HomePage = ({ aboutRef, servicesRef, contactRef, faqRef }) => {
  return (
    <div>
      <div>
        <HeroSection />
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
