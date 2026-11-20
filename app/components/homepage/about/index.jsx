import { personalData } from "@/utils/data/personal-data";
import SectionHeading from "../../helper/section-heading";

export default function AboutSection() {
  return (
    <section id="about" className="section-block about-section">
      <SectionHeading eyebrow="01 PROFILE" number="01 — PROFILE" lines={["Curiosity, backed", "by data."]} />
      <div className="about-grid">
        <p className="about-lead" data-reveal="left">
          I turn complex information into clear, useful direction for people and businesses.
        </p>
        <div data-reveal="right">
          <p className="body-copy">{personalData.description}</p>
          <p className="about-context">
            My work spans media intelligence and PR analytics — with a strong focus on the data pipelines,
            dashboards, and automation that make those insights reliable and repeatable.
          </p>
          <div className="about-tags">
            <span>B.E. Computer Science Engineering</span>
            <span>SQL</span>
            <span>Python</span>
            <span>Power BI</span>
            <span>Automation</span>
          </div>
        </div>
      </div>

      <div className="leadership-strip" data-reveal="up">
        <div className="leadership-mark" aria-hidden="true">HG</div>
        <div className="leadership-copy">
          <strong>Leadership is part of the work.</strong>
          <p>
            Team coordination, mentoring, stakeholder communication, SOP development, and quality assurance.
          </p>
        </div>
        <span className="leadership-pill">Team Lead · Onclusive</span>
      </div>
    </section>
  );
}
