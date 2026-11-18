import { personalData } from "@/utils/data/personal-data";
import ContactForm from "./contact-form";

export default function ContactSection() {
  return <section id="contact" data-reveal className="section-block contact-section">
    <div className="section-heading"><div><p className="eyebrow">START A CONVERSATION</p><h2>Let&apos;s make data<br /><span>work for you.</span></h2></div><span className="section-number">05 — CONTACT</span></div>
    <div className="contact-grid"><div className="contact-intro"><p className="body-copy">Have a data challenge, a role to discuss, or an idea to explore? I&apos;d be glad to hear from you.</p><a className="contact-direct" href={`mailto:${personalData.email}`}><span>Email</span><strong>{personalData.email}</strong><span>↗</span></a><a className="contact-direct" href={`tel:${personalData.phone.replace(/[^+\d]/g, "")}`}><span>Phone</span><strong>{personalData.phone}</strong><span>↗</span></a><a className="contact-direct" href={personalData.linkedIn} target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>Connect professionally</strong><span>↗</span></a></div><ContactForm /></div>
  </section>;
}
