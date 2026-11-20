import { skillsData, coreStack } from "@/utils/data/skills";
import SectionHeading from "../../helper/section-heading";
import CoreStack from "./core-stack";

const marqueeItems = [
  ...coreStack.map((item) => item.name),
  "DAX",
  "ETL Pipelines",
  "Forecasting",
  "Predictive Analytics",
  "Sentiment Analysis",
  "Boolean Search",
  "KPI Reporting",
  "Process Automation",
];

export default function Skills() {
  return (
    <section id="skills" className="section-block skills-section">
      <SectionHeading
        eyebrow="03 TOOLKIT"
        number="03 — TOOLKIT"
        lines={["Built for the full", "analytics lifecycle."]}
      />
      <CoreStack />

      <div className="skills-grid">
        {skillsData.map((group, index) => (
          <article
            data-reveal="up"
            key={group.category}
            className={`skill-group${group.compact ? " skill-group-compact" : ""}`}
          >
            <div className="skill-group-head">
              <span className="skill-group-index">0{index + 1}</span>
              <h3>{group.category}</h3>
              <span className="skill-group-count">{group.skills.length}</span>
            </div>
            <div className="skill-list">
              {group.skills.map((skill, skillIndex) => (
                <span data-reveal-child key={skill} style={{ "--i": skillIndex }}>
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="tools-marquee" aria-label="Tools in Harshal's analytics toolkit">
        <div className="tools-track" aria-hidden="true">
          {[...marqueeItems, ...marqueeItems].map((skill, index) => (
            <span key={`${skill}-${index}`}>
              {skill}
              <i className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
