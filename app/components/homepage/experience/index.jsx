import { experiences } from "@/utils/data/experience";
import SectionHeading from "../../helper/section-heading";

const onclusiveRoles = experiences.filter((item) => item.company === "Onclusive").length;

function EmphasizedPoint({ children }) {
  return (
    <>
      {children.split(/(16%|15%|10\+|three)/gi).map((part, index) =>
        /^(16%|15%|10\+|three)$/i.test(part) ? (
          <strong className="impact-emphasis" key={`${part}-${index}`}>
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-block experience-section">
      <SectionHeading
        eyebrow="02 EXPERIENCE"
        number="02 — EXPERIENCE"
        lines={["Experience that", "moves business forward."]}
        aside={
          <div className="experience-total">
            <strong>{String(onclusiveRoles).padStart(2, "0")}</strong>
            <span>roles at Onclusive</span>
          </div>
        }
      />

      <div className="timeline" data-timeline>
        <span className="timeline-draw" aria-hidden="true" />
        {experiences.map((item, index) => {
          const isCurrent = /present/i.test(item.duration);
          const isCompact = item.points.length === 0 && item.stack.length === 0;
          return (
            <article
              data-reveal={index % 2 === 0 ? "left" : "right"}
              key={item.id}
              className={`experience-card${isCurrent ? " is-current" : ""}`}
            >
              <div className="timeline-marker">
                <span>0{index + 1}</span>
              </div>
              <div className={`experience-content${isCompact ? " experience-content-compact" : ""}`}>
                <div className="experience-top">
                  <div>
                    <p className="eyebrow">
                      {item.company} <span className="experience-separator">/</span> {item.duration}
                    </p>
                    <h3>{item.title}</h3>
                  </div>
                  {isCurrent && (
                    <span className="current-badge">
                      <span className="status-dot" aria-hidden="true" />
                      Current
                    </span>
                  )}
                </div>

                {(item.type || item.workMode || item.location) && (
                  <div className="experience-meta">
                    {item.type && <span>{item.type}</span>}
                    {item.workMode && <span>{item.workMode}</span>}
                    {item.location && <span>{item.location}</span>}
                  </div>
                )}

                {item.points.length > 0 && (
                  <ul>
                    {item.points.map((point, pointIndex) => (
                      <li data-reveal-child key={point} style={{ "--i": pointIndex }}>
                        <EmphasizedPoint>{point}</EmphasizedPoint>
                      </li>
                    ))}
                  </ul>
                )}

                {item.stack.length > 0 && (
                  <div className="experience-stack">
                    {item.stack.map((tool, toolIndex) => (
                      <span data-reveal-child key={tool} style={{ "--i": toolIndex }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
