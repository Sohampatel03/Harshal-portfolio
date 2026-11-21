import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { personalData } from "@/utils/data/personal-data";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <div>
          <p className="eyebrow code-eyebrow">{"// HAVE A DATA CHALLENGE?"}</p>
          <h2>
            Let&apos;s turn it into
            <br />
            <span>something useful.</span>
          </h2>
        </div>
        <a className="button button-primary magnetic-button" href={`mailto:${personalData.email}`}>
          Start a conversation <FiArrowUpRight aria-hidden="true" />
        </a>
      </div>

      <div className="footer-meta">
        <Link className="brand" href="/#home" aria-label="Harshal Gunjal, home">
          <span className="brand-code">&lt;</span>
          <span className="brand-name">HG</span>
          <span className="brand-code"> /&gt;</span>
        </Link>
        <p>
          Harshal Gunjal <span>·</span> {personalData.designation}
        </p>
        <div className="footer-links">
          <a href={`mailto:${personalData.email}`}>Email ↗</a>
          <a href={personalData.linkedIn} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a href={personalData.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <a href={personalData.resume} target="_blank" rel="noopener noreferrer">
            Resume ↗
          </a>
        </div>
        <small>© {new Date().getFullYear()} Harshal Gunjal. All rights reserved.</small>
      </div>
    </footer>
  );
}
