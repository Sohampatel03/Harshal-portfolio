import { projectsData } from "@/utils/data/projects-data";
import ProjectCard from "./project-card";
import SectionHeading from "../../helper/section-heading";

export default function Projects() {
  return <section id="projects" className="section-block projects-section">
    <SectionHeading eyebrow="04 SELECTED WORK" number="04 — PROJECTS" lines={["Projects with a", "point of view."]} />
    <div className="projects-grid">{projectsData.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
  </section>;
}
