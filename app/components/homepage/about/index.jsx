import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import { personalData } from "@/utils/data/personal-data";
import { publicFileExists } from "@/utils/public-file";
import SectionHeading from "../../helper/section-heading";

export default function AboutSection({ hasPhoto }) {
  const showPhoto = Boolean((hasPhoto ?? publicFileExists(personalData.photo)) && personalData.photo);
  const city = personalData.address ? personalData.address.split(",")[0].trim() : "";

  return (
    <section id="about" className="section-block about-section">
      <SectionHeading eyebrow="01 PROFILE" number="01 — PROFILE" lines={["Curiosity, backed", "by data."]} />

      {showPhoto ? (
        <div className="about-grid about-grid-with-portrait">
          <div className="about-portrait-col" data-reveal="scale">
            <div className="about-portrait">
              <span className="portrait-glow" aria-hidden="true" />
              <span className="portrait-ring" aria-hidden="true" />
              <div className="portrait-frame">
                <Image
                  src={personalData.photo}
                  alt="Portrait of Harshal Gunjal"
                  width={392}
                  height={392}
                  sizes="(max-width: 700px) 72vw, 280px"
                  quality={90}
                  className="portrait-image"
                />
              </div>
              {personalData.designation && (
                <span className="portrait-chip portrait-chip-top" aria-hidden="true">
                  <span className="portrait-chip-dot" />
                  {personalData.designation}
                </span>
              )}
              {city && (
                <span className="portrait-chip portrait-chip-bottom" aria-hidden="true">
                  {city}
                </span>
              )}
              {typeof personalData.linkedIn === "string" && personalData.linkedIn.trim().length > 0 && (
                <a
                  className="portrait-social"
                  href={personalData.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Harshal Gunjal on LinkedIn"
                >
                  <FaLinkedinIn aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <div className="about-copy-col" data-reveal="right">
            <p className="about-lead">
              I turn complex information into clear, useful direction for people and businesses.
            </p>
            <p className="body-copy">{personalData.description}</p>
            <p className="about-context">
              My work spans media intelligence and PR analytics — with a strong focus on the data pipelines,
              dashboards, and automation that make those insights reliable and repeatable.
            </p>
            <div className="about-tags">
              <span>B.E. Computer Science Engineering</span>
              <span>SQL</span>
              <span>Python</span>
              <span>Advanced Excel</span>
              <span>Tableu</span>
              <span>Power BI</span>
              <span>Automation</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="about-grid">
          <p className="about-lead" data-reveal="left">
            I turn complex information into clear, useful direction for people and businesses.
          </p>
          <div data-reveal="right">
            <p className="body-copy">{personalData.description}</p>
            <p className="about-context">
              My work spans media intelligence and PR analytics — with a strong focus on the data pipelines,
              dashboards, and automation that make those insights reliable and repeatable.
            </p>
            <div className="about-tags">
              <span>B.E. Computer Science Engineering</span>
              <span>SQL</span>
              <span>Python</span>
              <span>Power BI</span>
              <span>Automation</span>
            </div>
          </div>
        </div>
      )}

      <div className="leadership-strip" data-reveal="up">
        {showPhoto ? (
          <div className="leadership-avatar">
            <Image
              src={personalData.photo}
              alt="Harshal Gunjal"
              width={48}
              height={48}
              sizes="48px"
              className="leadership-avatar-image"
            />
          </div>
        ) : (
          <div className="leadership-mark" aria-hidden="true">HG</div>
        )}
        <div className="leadership-copy">
          <strong>Leadership is part of the work.</strong>
          <p>
            Team coordination, mentoring, stakeholder communication, SOP development, and quality assurance.
          </p>
        </div>
        <span className="leadership-pill">Team Lead · Onclusive</span>
      </div>
    </section>
  );
}
