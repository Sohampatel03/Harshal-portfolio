import Link from "next/link";
import { personalData } from "@/utils/data/personal-data";

export default function Footer() {
  return <footer className="site-footer"><Link className="brand" href="/#home"><span>H</span>G<span className="brand-dot">.</span></Link><p>Harshal Gunjal <span>·</span> Data &amp; Business Analyst</p><div><a href={`mailto:${personalData.email}`}>Email</a><a href={personalData.linkedIn} target="_blank" rel="noreferrer">LinkedIn ↗</a></div><small>© {new Date().getFullYear()} Harshal Gunjal. All rights reserved.</small></footer>;
}
