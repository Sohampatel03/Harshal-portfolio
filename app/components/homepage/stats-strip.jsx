"use client";

import { useEffect, useRef, useState } from "react";
import { impactStats } from "@/utils/data/stats";

function Stat({ stat }) {
  const ref = useRef(null);
  const [count, setCount] = useState(stat.value);

  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 800;
      const tick = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        setCount(Math.round(stat.value * (1 - (1 - progress) ** 3)));
        if (progress < 1) requestAnimationFrame(tick);
      };
      setCount(0);
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stat.value]);

  return <article className="impact-stat" ref={ref}>
    <strong>{stat.prefix}{count}{stat.suffix}</strong>
    <span>{stat.label}</span>
    <small>{stat.context}</small>
  </article>;
}

export default function StatsStrip() {
  return <section className="impact-strip" aria-label="Professional impact">
    <div className="impact-heading"><p className="eyebrow code-eyebrow">{"// IMPACT IN NUMBERS"}</p><span>Measured outcomes from analytics work</span></div>
    <div className="impact-grid">{impactStats.map((stat) => <Stat key={stat.label} stat={stat} />)}</div>
  </section>;
}
