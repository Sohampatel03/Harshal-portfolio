"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const links = [["Home", "home"], ["About", "about"], ["Skills", "skills"], ["Experience", "experience"], ["Projects", "projects"], ["Education", "education"], ["Contact", "contact"]];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <nav className="site-nav"><Link className="brand" href="/#home"><span>H</span>G<span className="brand-dot">.</span></Link>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>{open ? <FiX /> : <FiMenu />}</button>
    <div className={`nav-links ${open ? "nav-open" : ""}`}>{links.map(([label, id]) => <Link key={id} href={`/#${id}`} onClick={() => setOpen(false)}>{label}</Link>)}<Link className="nav-cta" href="/#contact" onClick={() => setOpen(false)}>Let&apos;s talk <span>↗</span></Link></div>
  </nav>;
}
