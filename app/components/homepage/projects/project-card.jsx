"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiMaximize2, FiX } from "react-icons/fi";

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const closeRef = useRef(null);
  const returnFocusRef = useRef(null);
  const allImages = [project.image, ...(project.gallery || [])].filter(Boolean);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeImage = allImages[selectedIndex] || project.image;

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, []);

  const stepLightbox = useCallback(
    (direction) => {
      setSelectedIndex((current) => (current + direction + allImages.length) % allImages.length);
    },
    [allImages.length]
  );

  useEffect(() => {
    if (!lightboxOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      }
      if (allImages.length > 1 && event.key === "ArrowRight") {
        event.preventDefault();
        stepLightbox(1);
      }
      if (allImages.length > 1 && event.key === "ArrowLeft") {
        event.preventDefault();
        stepLightbox(-1);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxOpen, allImages.length, closeLightbox, stepLightbox]);

  function handlePointerMove(event) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || !cardRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    cardRef.current.style.setProperty("--tilt-x", `${(0.5 - y) * 1.8}deg`);
    cardRef.current.style.setProperty("--tilt-y", `${(x - 0.5) * 2.2}deg`);
    cardRef.current.style.setProperty("--cursor-x", `${x * 100}%`);
    cardRef.current.style.setProperty("--cursor-y", `${y * 100}%`);
  }

  function resetPointer() {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--tilt-x", "0deg");
    cardRef.current.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <>
      <article
        ref={cardRef}
        data-reveal={index % 2 ? "right" : "left"}
        className="project-card"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        {activeImage ? (
          <button
            type="button"
            className="project-art project-art-trigger"
            onClick={(event) => {
              returnFocusRef.current = event.currentTarget;
              setLightboxOpen(true);
            }}
            aria-label={`Inspect ${project.name} dashboard screenshot (${selectedIndex + 1} of ${allImages.length})`}
          >
            <Image
              src={activeImage}
              alt={`${project.name} dashboard screenshot ${selectedIndex + 1}`}
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
              className="project-main-image"
            />
            <span className="project-art-label">
              <FiMaximize2 aria-hidden="true" />
              {allImages.length > 1 ? `Inspect · ${selectedIndex + 1}/${allImages.length}` : "Inspect dashboard"}
            </span>
          </button>
        ) : (
          <div className="project-art project-art-fallback" aria-label="Illustrative project preview">
            <span>{project.name}</span>
          </div>
        )}

        <div className="project-details">
          <div className="project-body">
            <p className="eyebrow">{project.role}</p>
            <h3>{project.name}</h3>
            <p className="body-copy">{project.description}</p>
            {project.impact && <p className="project-impact">{project.impact}</p>}
            <div className="project-tags">
              {project.tools.map((tool, toolIndex) => (
                <span data-reveal-child key={tool} style={{ "--i": toolIndex }}>
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="project-footer">
            {allImages.length > 1 && (
              <div className="project-gallery" role="group" aria-label={`${project.name} views`}>
                {allImages.map((src, imageIndex) => (
                  <button
                    type="button"
                    key={src}
                    className={imageIndex === selectedIndex ? "is-active" : ""}
                    onClick={() => setSelectedIndex(imageIndex)}
                    aria-label={`Preview view ${imageIndex + 1} for ${project.name}`}
                    aria-pressed={imageIndex === selectedIndex}
                  >
                    <Image src={src} alt="" fill sizes="96px" />
                  </button>
                ))}
              </div>
            )}

            {(Boolean(typeof project.code === "string" && project.code.trim()) || Boolean(project.demo)) && (
              <div className="project-actions">
                {typeof project.code === "string" && project.code.trim().length > 0 && (
                  <a className="project-link" href={project.code} target="_blank" rel="noopener noreferrer">
                    View on GitHub <FiArrowUpRight aria-hidden="true" />
                  </a>
                )}
                {project.demo && (
                  <a className="project-link" href={project.demo} target="_blank" rel="noopener noreferrer">
                    Live project <FiArrowUpRight aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </article>

      {lightboxOpen && activeImage && createPortal(
        <div
          className="lightbox-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <div
            className="certificate-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} dashboard view ${selectedIndex + 1} of ${allImages.length}`}
          >
            <button ref={closeRef} type="button" className="lightbox-close" onClick={closeLightbox} aria-label="Close preview">
              <FiX />
            </button>
            {allImages.length > 1 && (
              <button
                type="button"
                className="lightbox-arrow lightbox-prev"
                onClick={() => stepLightbox(-1)}
                aria-label="Previous screenshot"
              >
                <FiArrowLeft />
              </button>
            )}
            <div className="lightbox-image">
              <Image
                src={activeImage}
                alt={`${project.name} dashboard view ${selectedIndex + 1}`}
                fill
                sizes="92vw"
                priority={true}
                quality={92}
                style={{ objectFit: "contain" }}
              />
            </div>
            {allImages.length > 1 && (
              <button
                type="button"
                className="lightbox-arrow lightbox-next"
                onClick={() => stepLightbox(1)}
                aria-label="Next screenshot"
              >
                <FiArrowRight />
              </button>
            )}
            <p className="lightbox-caption">
              {project.name} · View {selectedIndex + 1} of {allImages.length}
            </p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
