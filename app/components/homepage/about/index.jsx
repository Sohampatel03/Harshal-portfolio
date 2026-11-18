import { personalData } from "@/utils/data/personal-data";

export default function AboutSection() {
  return <section id="about" data-reveal className="section-block about-section">
    <div className="section-heading"><div><p className="eyebrow">A LITTLE ABOUT ME</p><h2>Curiosity, backed<br className="desktop-break" /> by <span>data.</span></h2></div><span className="section-number">01 — PROFILE</span></div>
    <div className="about-grid">
      <p className="about-lead">I turn complex information into clear, useful direction for people and businesses.</p>
      <div><p className="body-copy">{personalData.description}</p>
        <div className="about-tags"><span>Media intelligence</span><span>Process optimization</span><span>Predictive analytics</span></div>
      </div>
    </div>
    <div className="leadership-strip"><div className="leadership-mark">HG</div><div><strong>Leadership is part of the work.</strong><p>Team coordination, mentoring, stakeholder communication, SOP development and quality assurance.</p></div><span className="leadership-arrow">↗</span></div>
  </section>;
}
