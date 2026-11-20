import fs from "node:fs";
import path from "node:path";
import { certifications, educations } from "@/utils/data/educations";
import CertificateGrid from "./certificate-grid";
import SectionHeading from "../../helper/section-heading";

const certificateCards = certifications.map((certificate) => ({
  ...certificate,
  hasImage: Boolean(certificate.image && fs.existsSync(path.join(process.cwd(), "public", certificate.image.replace(/^\//, "")))),
}));

export default function Education() {
  return <section id="education" className="section-block education-section">
    <SectionHeading eyebrow="05 LEARNING" number="05 — LEARNING" lines={["Education &", "certifications."]} />
    <div className="education-grid">
      <div className="education-list">{educations.map((item, index) => <article data-reveal={index % 2 ? "right" : "left"} className="education-item" key={item.id}>
        <span className="education-date">{item.duration}</span><div><h3>{item.title}</h3>{item.institution && <p>{item.institution}</p>}</div><span className="education-score">{item.score}</span>
      </article>)}</div>
      <div className="education-aside" data-reveal="up"><p className="eyebrow code-eyebrow">{"// COMPUTER SCIENCE"}</p><p>Foundations in data analytics and data science.</p><div className="education-mark">B.E.<span>2020 — 2024</span></div></div>
    </div>
    <div className="certifications-section">
      <div className="certifications-heading"><div><p className="eyebrow code-eyebrow">{"// CREDENTIALS"}</p><h3>Certifications</h3></div><span>{certificateCards.length} certificates</span></div>
      <CertificateGrid certificates={certificateCards} />
    </div>
  </section>;
}
