import { FiArrowUpRight } from "react-icons/fi";

export default function ProjectCard({ project, index }) {
  return <article data-reveal className="project-card">
    <div className={`project-preview preview-${index + 1}`} aria-hidden="true"><span className="preview-kicker">PROJECT 0{index + 1}</span><div className="preview-title">{project.name}</div><div className="preview-tool-words">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div><span className="preview-caption">SELECTED WORK · {project.role.toUpperCase()}</span></div>
    <div className="project-details"><p className="eyebrow">{project.role}</p><h3>{project.name}</h3><p className="body-copy">{project.description}</p><div className="project-tags">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div><a className="project-link" href={project.code} target="_blank" rel="noreferrer">View on GitHub <FiArrowUpRight /></a></div>
  </article>;
}
