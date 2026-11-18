import { skillsData } from "@/utils/data/skills";

export default function Skills() {
  return <section id="skills" data-reveal className="section-block skills-section">
    <div className="section-heading"><div><p className="eyebrow">TOOLS &amp; CAPABILITIES</p><h2>Built for the full<br />analytics <span>lifecycle.</span></h2></div><span className="section-number">02 — TOOLKIT</span></div>
    <div className="skills-grid">{skillsData.map((group, index) => <article data-reveal key={group.category} className="skill-group">
      <div className="skill-group-head"><span>0{index + 1}</span><h3>{group.category}</h3></div>
      <div className="skill-list">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
    </article>)}</div>
  </section>;
}
