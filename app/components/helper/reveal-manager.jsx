"use client";

import { useEffect } from "react";

export default function RevealManager() {
  useEffect(() => {
    const targets = document.querySelectorAll("[data-reveal]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.dataset.revealed = "true";
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });

    targets.forEach((target, index) => {
      target.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 90}ms`);
      target.dataset.revealReady = "true";
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
