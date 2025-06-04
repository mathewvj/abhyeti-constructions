import { useState } from "react";
import { ChevronRight } from "lucide-react";
import "./FaqSection.css";

const FaqSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: 'How long does a typical construction project take?',
      answer: 'Project timelines vary based on scope and complexity. Residential projects typically take 6-12 months, while commercial projects may take 12-24 months. We provide detailed timelines during project planning.'
    },
    {
      question: 'Do you provide free estimates?',
      answer: 'Yes, we offer free consultations and estimates for all projects. Our team will assess your requirements and provide a detailed cost breakdown with no obligation.'
    },
    {
      question: 'Are you licensed and insured?',
      answer: 'Absolutely. Abhyeti Constructions is fully licensed, bonded, and insured. We maintain all necessary certifications and comply with local building codes and regulations.'
    },
    {
      question: 'What is your warranty policy?',
      answer: 'We provide comprehensive warranties on all our work. Structural elements typically carry a 10-year warranty, while finishes and fixtures have a 1-2 year warranty period.'
    }
  ];

  return (
    <section className="faq-section">
      <div className="container">
        <div className="faq-header">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">Get answers to common questions about our construction services.</p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                aria-expanded={openFAQ === index}
              >
                <span>{faq.question}</span>
                <ChevronRight
                  className={`faq-icon ${openFAQ === index ? "faq-icon-rotated" : ""}`}
                />
              </button>
              {openFAQ === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
