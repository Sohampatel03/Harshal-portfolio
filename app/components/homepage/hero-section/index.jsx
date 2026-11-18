import Link from "next/link";
import { FiArrowDownRight, FiArrowUpRight, FiBarChart2, FiDatabase, FiLayers } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> DATA · INSIGHT · IMPACT</p>
        <h1>Harshal<br /><span>Gunjal</span></h1>
        <p className="hero-role">Data &amp; Business Analyst</p>
        <p className="hero-lede">Turning complex data into <span>meaningful business decisions.</span></p>
        <p className="hero-description">2 years of professional experience in Data Analytics, Business Intelligence and workflow automation. Passionate about building data-driven solutions and solving real-world business problems.</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="#projects">Explore my work <FiArrowDownRight /></Link>
          <Link className="button button-secondary" href="#contact">Let&apos;s connect <FiArrowUpRight /></Link>
        </div>
        <div className="hero-facts">
          <div><strong>2+ Years</strong><span>Experience</span></div>
          <div><strong>SQL <i>·</i> Python</strong><span>Analytics toolkit</span></div>
          <div><strong>Power BI</strong><span>Business intelligence</span></div>
          <div><strong>Leadership</strong><span>Team collaboration</span></div>
        </div>
      </div>
      <div className="hero-visual" aria-label="Illustration of an analytics workflow">
        <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
        <div className="visual-card visual-main">
          <div className="visual-card-head"><div><span className="micro-label">ANALYTICS WORKFLOW</span><strong>From data to decisions</strong></div><span className="visual-icon"><FiBarChart2 /></span></div>
          <div className="workflow-row"><span className="workflow-icon"><FiDatabase /></span><div><strong>Structured data</strong><small>SQL · Python · Excel</small></div><span className="workflow-step">01</span></div>
          <div className="workflow-connector" />
          <div className="workflow-row"><span className="workflow-icon cyan"><FiLayers /></span><div><strong>Analysis &amp; modeling</strong><small>Clean · Transform · Forecast</small></div><span className="workflow-step">02</span></div>
          <div className="workflow-connector" />
          <div className="workflow-row"><span className="workflow-icon blue"><FiBarChart2 /></span><div><strong>Business insight</strong><small>Power BI · Reporting</small></div><span className="workflow-step">03</span></div>
          <div className="visual-rule"><span /> insight-led outcomes</div>
        </div>
        <div className="visual-note note-top"><span className="note-dot" /> Onclusive <small>Professional experience</small></div>
        <div className="visual-note note-bottom"><span className="note-icon">↗</span> Clarity from complexity</div>
        <span className="visual-index">01 / 07</span>
      </div>
    </section>
  );
}
