"use client";

import { useEffect } from "react";

export default function RevealManager() {
  useEffect(() => {
    const targets = document.querySelectorAll("[data-reveal]");
    const timelines = document.querySelectorAll("[data-timeline]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.dataset.revealed = "true";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.04, rootMargin: "0px 0px 40px 0px" }
    );

    targets.forEach((target, index) => {
      target.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 70}ms`);
      target.dataset.revealReady = "true";
      observer.observe(target);
    });

    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.dataset.drawn = "true";
          timelineObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );
    timelines.forEach((timeline) => {
      timeline.dataset.timelineReady = "true";
      timelineObserver.observe(timeline);
    });

    return () => {
      observer.disconnect();
      timelineObserver.disconnect();
    };
  }, []);

  return null;
}
