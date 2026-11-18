import { experiences } from "@/utils/data/experience";
import { FiArrowUpRight } from "react-icons/fi";

export default function Experience() {
  return <section id="experience" data-reveal className="section-block experience-section">
    <div className="section-heading"><div><p className="eyebrow">CAREER JOURNEY</p><h2>Experience that<br />moves <span>business forward.</span></h2></div><div className="experience-total"><strong>02</strong><span>roles at Onclusive</span></div></div>
    <div className="timeline">{experiences.map((item, index) => <article data-reveal key={item.id} className="experience-card">
      <div className="timeline-marker"><span>0{index + 1}</span></div>
      <div className="experience-content"><div className="experience-top"><div><p className="eyebrow">{item.company} <span className="experience-separator">/</span> {item.duration}</p><h3>{item.title}</h3></div><FiArrowUpRight className="experience-arrow" /></div>
        <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
        {index === 0 && <p className="scope-note">Team size and scope details can be added when confirmed.</p>}
      </div>
    </article>)}</div>
  </section>;
}
