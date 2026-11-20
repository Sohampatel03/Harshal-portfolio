"use client";

import { useEffect } from "react";

export default function PointerEffects() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return undefined;
    const spotlight = document.querySelector(".cursor-spotlight");
    const moveSpotlight = (event) => {
      spotlight?.style.setProperty("--spot-x", `${event.clientX}px`);
      spotlight?.style.setProperty("--spot-y", `${event.clientY}px`);
    };
    const buttons = document.querySelectorAll(".magnetic-button");
    const cleanups = [];
    buttons.forEach((button) => {
      const move = (event) => {
        const bounds = button.getBoundingClientRect();
        const dx = (event.clientX - bounds.left - bounds.width / 2) * .12;
        const dy = (event.clientY - bounds.top - bounds.height / 2) * .12;
        button.style.setProperty("--magnetic-x", `${dx}px`);
        button.style.setProperty("--magnetic-y", `${dy}px`);
      };
      const reset = () => {
        button.style.setProperty("--magnetic-x", "0px");
        button.style.setProperty("--magnetic-y", "0px");
      };
      button.addEventListener("pointermove", move);
      button.addEventListener("pointerleave", reset);
      cleanups.push(() => { button.removeEventListener("pointermove", move); button.removeEventListener("pointerleave", reset); });
    });
    window.addEventListener("pointermove", moveSpotlight, { passive: true });
    return () => { window.removeEventListener("pointermove", moveSpotlight); cleanups.forEach((cleanup) => cleanup()); };
  }, []);

  return <div className="cursor-spotlight" aria-hidden="true" />;
}
