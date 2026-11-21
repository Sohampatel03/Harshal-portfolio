"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";

export default function StartConversationLink() {
  const focusTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (focusTimer.current) window.clearTimeout(focusTimer.current);
    };
  }, []);

  const handleClick = (event) => {
    const target = document.getElementById("contact-form");
    if (!target) return;

    event.preventDefault();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.dataset.revealed = "true";
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });

    try {
      window.history.replaceState(null, "", "#contact-form");
    } catch {
      // Ignore history API restrictions
    }

    if (focusTimer.current) window.clearTimeout(focusTimer.current);
    focusTimer.current = window.setTimeout(
      () => {
        target.dataset.revealed = "true";
        const firstInput = target.querySelector("input:not([type='hidden']):not(.honeypot), textarea");
        firstInput?.focus({ preventScroll: true });
      },
      reducedMotion ? 50 : 600
    );
  };

  return (
    <Link
      className="button button-primary magnetic-button"
      href="/#contact-form"
      onClick={handleClick}
    >
      Start a conversation <FiArrowUpRight aria-hidden="true" />
    </Link>
  );
}
