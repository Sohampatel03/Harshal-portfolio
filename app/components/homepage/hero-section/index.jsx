"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowDownRight, FiArrowUpRight, FiBarChart2, FiDownload } from "react-icons/fi";
import { personalData } from "@/utils/data/personal-data";

const keywords = ["Python", "SQL", "Power BI", "Forecasting", "Automation"];
const tabs = [
  {
    id: "sql",
    label: "analysis.sql",
    title: "Coverage & Sentiment Query",
    language: "SQL",
    code: `-- Illustrative query · media intelligence\nSELECT category, COUNT(*) AS records\nFROM analytics_events\nWHERE event_date >= :start_date\nGROUP BY category\nORDER BY records DESC;`,
  },
  {
    id: "python",
    label: "model.py",
    title: "Forecasting & Reporting Pipeline",
    language: "PYTHON",
    code: `# Illustrative analysis · automated workflow\nsource = load_source(path)\nclean = transform(source)\nmodel = build_forecast(clean)\nreport = publish_dashboard(model)`,
  },
];

const pipelineSteps = ["Extract", "Transform", "Model", "Dashboard"];

function highlightCode(text) {
  return text.split("\n").map((line, lineIndex) => {
    const isComment = /^\s*(--|#)/.test(line);
    if (isComment) {
      return (
        <span className="code-line" key={lineIndex}>
          <span className="tok-comment">{line}</span>
          {"\n"}
        </span>
      );
    }
    const tokens = line.split(/(\b(?:SELECT|FROM|WHERE|GROUP BY|ORDER BY|AS|DESC|COUNT)\b|\b(?:load_source|transform|build_forecast|publish_dashboard)\b)/g);
    return (
      <span className="code-line" key={lineIndex}>
        {tokens.map((token, tokenIndex) => {
          if (/^(SELECT|FROM|WHERE|GROUP BY|ORDER BY|AS|DESC|COUNT)$/.test(token)) {
            return <span className="tok-keyword" key={tokenIndex}>{token}</span>;
          }
          if (/^(load_source|transform|build_forecast|publish_dashboard)$/.test(token)) {
            return <span className="tok-fn" key={tokenIndex}>{token}</span>;
          }
          return token;
        })}
        {"\n"}
      </span>
    );
  });
}

function HeroTerminal() {
  const [tabIndex, setTabIndex] = useState(0);
  const [charCount, setCharCount] = useState(tabs[0].code.length);
  const [manualLock, setManualLock] = useState(false);
  const timer = useRef(null);

  const currentTab = tabs[tabIndex];
  const fullCode = currentTab.code;
  const visibleCode = fullCode.slice(0, charCount);
  const activeStep = fullCode.length > 0 ? Math.min(3, Math.floor((Math.min(charCount, fullCode.length) / fullCode.length) * 4)) : 3;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let cancelled = false;
    let current = 0;

    const tick = () => {
      if (cancelled) return;
      if (current <= fullCode.length) {
        setCharCount(current);
        current += 1;
        timer.current = window.setTimeout(tick, 22);
      } else if (!manualLock) {
        timer.current = window.setTimeout(() => {
          if (cancelled) return;
          setTabIndex((prev) => (prev + 1) % tabs.length);
        }, 2600);
      }
    };

    timer.current = window.setTimeout(tick, 320);

    return () => {
      cancelled = true;
      window.clearTimeout(timer.current);
    };
  }, [tabIndex, manualLock, fullCode]);

  const handleTabSelect = (index) => {
    setManualLock(true);
    setTabIndex(index);
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCharCount(reduced ? tabs[index].code.length : 0);
  };

  return (
    <div className="terminal-window">
      <div className="terminal-topbar">
        <div className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="terminal-tabs" role="tablist" aria-label="Sample analytics code">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tabIndex === index}
              className={tabIndex === index ? "active" : ""}
              onClick={() => handleTabSelect(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span className="terminal-language">{currentTab.language}</span>
      </div>

      <div className="terminal-title">
        <span>{currentTab.title}</span>
        <FiBarChart2 aria-hidden="true" />
      </div>

      <pre className="terminal-code" aria-label="Illustrative SQL and Python snippets" aria-live="off">
        <code>
          {highlightCode(visibleCode)}
          <span className="terminal-caret" aria-hidden="true" />
        </code>
      </pre>

      <div className="pipeline-strip" aria-label="Extract, Transform, Model, Dashboard">
        {pipelineSteps.map((step, index) => (
          <div className={`pipeline-step${index <= activeStep ? " is-active" : ""}`} key={step}>
            <span className="pipeline-node">{String(index + 1).padStart(2, "0")}</span>
            <span>{step}</span>
            {index < 3 && <i className="pipeline-flow" aria-hidden="true" />}
          </div>
        ))}
      </div>

      <svg className="terminal-sparkline" viewBox="0 0 100 24" role="img" aria-label="Decorative illustrative trend line">
        <defs>
          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(114, 229, 212, 0.28)" />
            <stop offset="100%" stopColor="rgba(114, 229, 212, 0)" />
          </linearGradient>
        </defs>
        <path className="spark-area" d="M2 18 C14 18 14 7 26 10 S39 19 50 12 S64 4 74 9 S88 13 98 3 L98 24 L2 24 Z" fill="url(#sparkFill)" />
        <path className="spark-line" d="M2 18 C14 18 14 7 26 10 S39 19 50 12 S64 4 74 9 S88 13 98 3" />
      </svg>
    </div>
  );
}

export default function HeroSection({ hasPhoto = false }) {
  const visualRef = useRef(null);
  const [keywordIndex, setKeywordIndex] = useState(0);
  const showPhoto = Boolean(hasPhoto && personalData.photo);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = window.setInterval(() => setKeywordIndex((current) => (current + 1) % keywords.length), 2400);
    return () => window.clearInterval(id);
  }, []);

  const moveVisual = (event) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || !visualRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    visualRef.current.style.setProperty("--parallax-x", `${x * 10}px`);
    visualRef.current.style.setProperty("--parallax-y", `${y * 8}px`);
  };

  const resetVisual = () => {
    if (!visualRef.current) return;
    visualRef.current.style.setProperty("--parallax-x", "0px");
    visualRef.current.style.setProperty("--parallax-y", "0px");
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-copy">
        <p className="hero-badge">
          <span className="status-dot" aria-hidden="true" />
          <span>DATA ANALYST · PYTHON · SQL · POWER BI</span>
        </p>

        <h1>
          Harshal
          <br />
          <span className="surname-shimmer">Gunjal</span>
        </h1>

        <p className="hero-role">
          <span>{personalData.designation}</span>
          <span className="role-divider" aria-hidden="true">/</span>
          <span className="rotating-keyword" key={keywords[keywordIndex]}>
            {keywords[keywordIndex]}
          </span>
        </p>

        <p className="hero-lede">
          Turning complex data into <span>meaningful business decisions.</span>
        </p>

        <p className="hero-description">
          2+ years of professional experience in Data Analytics, Business Intelligence, and workflow automation.
          Passionate about building data-driven solutions and solving real-world business problems.
        </p>

        <div className="hero-actions">
          <Link className="button button-primary magnetic-button" href="#projects">
            Explore my work <FiArrowDownRight aria-hidden="true" />
          </Link>
          <Link className="button button-secondary magnetic-button" href="#contact">
            Let&apos;s connect <FiArrowUpRight aria-hidden="true" />
          </Link>
          <a
            className="button button-quiet magnetic-button"
            href={personalData.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiDownload aria-hidden="true" /> Resume
          </a>
        </div>

        <div className="hero-facts">
          <div>
            <strong>2+ Years</strong>
            <span>Experience</span>
          </div>
          <div>
            <strong>SQL · Python</strong>
            <span>Analytics toolkit</span>
          </div>
          <div>
            <strong>Power BI</strong>
            <span>Business intelligence</span>
          </div>
          <div>
            <strong>B.E. CSE</strong>
            <span>Computer Science</span>
          </div>
        </div>
      </div>

      <div
        className="hero-visual"
        ref={visualRef}
        onPointerMove={moveVisual}
        onPointerLeave={resetVisual}
        aria-label="Illustrative data analysis workflow"
      >
        <div className="visual-orbit orbit-one" aria-hidden="true" />
        <div className="visual-orbit orbit-two" aria-hidden="true" />
        <HeroTerminal />
        <div className={`visual-note note-top${showPhoto ? " note-top-avatar" : ""}`}>
          {showPhoto ? (
            <>
              <div className="note-avatar-wrap">
                <Image
                  src={personalData.photo}
                  alt="Harshal Gunjal"
                  width={44}
                  height={44}
                  priority
                  sizes="44px"
                  className="note-avatar"
                />
              </div>
              <div className="note-top-copy">
                <strong>Onclusive</strong>
                <small>Management Team Lead</small>
              </div>
            </>
          ) : (
            <>
              <span className="note-dot" aria-hidden="true" />
              <strong>Onclusive</strong>
              <small>Management Team Lead</small>
            </>
          )}
        </div>
        <div className="visual-note note-bottom">
          <span className="note-icon" aria-hidden="true">↗</span>
          <span>Analytics · BI · Automation</span>
        </div>
        <span className="visual-index" aria-hidden="true">SQL → INSIGHT → ACTION</span>
      </div>
    </section>
  );
}
