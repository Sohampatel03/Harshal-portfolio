import { personalData } from "@/utils/data/personal-data";
import ContactForm from "./contact-form";
import CopyEmailButton from "./copy-email";
import SectionHeading from "../../helper/section-heading";

export default function ContactSection() {
  return (
    <section id="contact" className="section-block contact-section">
      <SectionHeading eyebrow="06 CONTACT" number="06 — CONTACT" lines={["Let's make data", "work for you."]} />
      <div className="contact-grid">
        <div className="contact-intro" data-reveal="left">
          <p className="body-copy">
            Have a data challenge, an analytics role to discuss, or an idea to explore? I&apos;d be glad to hear from you.
          </p>

          <div className="contact-list">
            <div className="contact-direct contact-direct-email">
              <a className="contact-direct-link" href={`mailto:${personalData.email}`}>
                <span>Email</span>
                <strong>{personalData.email}</strong>
              </a>
              <CopyEmailButton email={personalData.email} />
            </div>

            <a className="contact-direct" href={`tel:${personalData.phone.replace(/[^+\d]/g, "")}`}>
              <span>Phone</span>
              <strong>{personalData.phone}</strong>
              <span className="contact-arrow" aria-hidden="true">↗</span>
            </a>

            <a className="contact-direct" href={personalData.linkedIn} target="_blank" rel="noopener noreferrer">
              <span>LinkedIn</span>
              <strong>Connect professionally</strong>
              <span className="contact-arrow" aria-hidden="true">↗</span>
            </a>

            <a className="contact-direct" href={personalData.github} target="_blank" rel="noopener noreferrer">
              <span>GitHub</span>
              <strong>Harshal1610</strong>
              <span className="contact-arrow" aria-hidden="true">↗</span>
            </a>

            <a className="contact-direct" href={personalData.resume} target="_blank" rel="noopener noreferrer">
              <span>Resume</span>
              <strong>Open PDF</strong>
              <span className="contact-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div id="contact-form" data-reveal="right">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
