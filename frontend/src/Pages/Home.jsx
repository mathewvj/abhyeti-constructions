import AboutSection from "../Components/About/AboutSection";
import ContactSection from "../Components/Contact/ContactSection";
import FaqSection from "../Components/Faq/FaqSection";
import HeroSection from "../Components/Hero/HeroSection";
import ServiceSection from "../Components/Service/ServiceSection";

const HomePage = ({ aboutRef, servicesRef, contactRef, faqRef }) => {
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
