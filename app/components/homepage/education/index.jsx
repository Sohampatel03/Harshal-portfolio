import { certifications, educations } from "@/utils/data/educations";

export default function Education() {
  return <section id="education" data-reveal className="section-block education-section">
    <div className="section-heading"><div><p className="eyebrow">FOUNDATIONS</p><h2>Education &amp;<br /><span>certifications.</span></h2></div><span className="section-number">04 — LEARNING</span></div>
    <div className="education-grid"><div className="education-list">{educations.map((item) => <article className="education-item" key={item.id}><span className="education-date">{item.duration}</span><div><h3>{item.title}</h3><p>{item.institution}</p></div></article>)}</div>
      <div className="certifications"><p className="eyebrow">CERTIFICATIONS</p>{certifications.map((item, index) => <div className="certification-item" key={item}><span>0{index + 1}</span><strong>{item}</strong><span className="certification-check">↗</span></div>)}</div>
    </div>
  </section>;
}
