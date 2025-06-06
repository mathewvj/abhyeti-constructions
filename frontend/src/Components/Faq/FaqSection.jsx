import { useState } from "react";
import { ChevronRight } from "lucide-react";
import "./FaqSection.css";

const FaqSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: 'What types of construction services do you offer?',
      answer: 'We specialize in road construction, bridge development, and building contracts—including both residential and commercial projects.'
    },
    {
      question: 'Where is your company based?',
      answer: 'Abhyeti Construction is proudly based in Goa, and we undertake projects across the region.'
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary depending on size and scope. After an initial consultation, we provide a clear estimate and project schedule to keep everything on track.'
    },
    {
      question: ' Can I see examples of your previous work?',
      answer: 'Absolutely! We’re happy to share our portfolio and completed projects. You can also check our Gallery page for photos.'
    },
    {
      question: 'How do I get a quote for my project?',
      answer: 'You can contact us via phone, email, or our website form. We’ll schedule a site visit or discussion and provide a free, detailed quotation.'
    },
    {
      question: 'What sets Abhyeti Construction apart?',
      answer: 'We blend local experience, reliable project management, and a focus on quality materials to deliver trusted results—on time and within budget.'
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
