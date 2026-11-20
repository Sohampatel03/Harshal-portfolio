"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";

const links = [
  ["Home", "home"],
  ["About", "about"],
  ["Experience", "experience"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Education", "education"],
  ["Contact", "contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 20);
        if (y < 140) {
          setActive("home");
        } else if (window.innerHeight + y >= document.documentElement.scrollHeight - 80) {
          setActive("contact");
        }
        frame = 0;
      });
    };
    onScroll();

    const sections = links.map(([, id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 140) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-22% 0px -55% 0px", threshold: [0, 0.15, 0.35, 0.6] }
    );
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className={`site-nav${scrolled ? " site-nav-scrolled" : ""}`}>
      <nav className="site-nav-inner" aria-label="Main navigation">
        <Link className="brand" href="/#home" aria-label="Harshal Gunjal, home">
          <span className="brand-code">&lt;</span>
          <span className="brand-name">HG</span>
          <span className="brand-code"> /&gt;</span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>

        <div className={`nav-links${open ? " nav-open" : ""}`}>
          {links.map(([label, id]) => (
            <Link
              key={id}
              href={`/#${id}`}
              onClick={() => setOpen(false)}
              aria-current={active === id ? "location" : undefined}
              className={active === id ? "nav-active" : ""}
            >
              {label}
            </Link>
          ))}
          <Link className="nav-cta" href="/#contact" onClick={() => setOpen(false)}>
            Let&apos;s talk <FiArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
