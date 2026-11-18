import { projectsData } from "@/utils/data/projects-data";
import ProjectCard from "./project-card";

export default function Projects() {
  return <section id="projects" data-reveal className="section-block projects-section">
    <div className="section-heading"><div><p className="eyebrow">SELECTED WORK</p><h2>Projects with a<br /><span>point of view.</span></h2></div><span className="section-number">03 — PROJECTS</span></div>
    <div className="projects-grid">{projectsData.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
  </section>;
}
