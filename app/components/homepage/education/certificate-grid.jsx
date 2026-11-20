"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiArrowLeft, FiArrowRight, FiAward, FiExternalLink, FiMaximize2, FiX } from "react-icons/fi";

function issuerMark(issuer = "") {
  return issuer
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function caption(certificate) {
  return [certificate.title, certificate.issuer, certificate.issued].filter(Boolean).join(" · ");
}

export default function CertificateGrid({ certificates }) {
  const [active, setActive] = useState(-1);
  const closeRef = useRef(null);
  const returnFocusRef = useRef(null);
  const dialogRef = useRef(null);
  const imageCertificates = useMemo(() => certificates.filter((item) => item.hasImage), [certificates]);
  const current = imageCertificates[active];

  const close = useCallback(() => {
    setActive(-1);
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, []);

  const move = useCallback(
    (direction) => {
      setActive((index) => (index + direction + imageCertificates.length) % imageCertificates.length);
    },
    [imageCertificates.length]
  );

  useEffect(() => {
    if (!current) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (imageCertificates.length > 1 && event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }
      if (imageCertificates.length > 1 && event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const items = dialogRef.current.querySelectorAll("button:not([disabled]), a[href]");
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [current, close, imageCertificates.length, move]);

  return (
    <>
      <div className="certificate-grid">
        {certificates.map((certificate) => {
          const imageIndex = imageCertificates.findIndex((item) => item.id === certificate.id);
          const content = (
            <>
              <div className="certificate-header">
                <span className="issuer-monogram" aria-hidden="true">
                  {certificate.issuer ? issuerMark(certificate.issuer) : <FiAward />}
                </span>
                {certificate.hasImage && (
                  <span className="certificate-expand-pill">
                    <FiMaximize2 aria-hidden="true" /> Preview
                  </span>
                )}
              </div>

              <span className="certificate-copy">
                <strong>{certificate.title}</strong>
                {certificate.issuer && <span className="certificate-issuer">{certificate.issuer}</span>}
                {certificate.issued && <span className="certificate-date">{certificate.issued}</span>}
              </span>

              {certificate.credentialId && (
                <span className="certificate-id">ID · {certificate.credentialId}</span>
              )}
              {certificate.description && (
                <span className="certificate-description">{certificate.description}</span>
              )}
              {certificate.tags?.length > 0 && (
                <span className="certificate-tags">
                  {certificate.tags.map((tag, tagIndex) => (
                    <i data-reveal-child key={tag} style={{ "--i": tagIndex }}>
                      {tag}
                    </i>
                  ))}
                </span>
              )}
            </>
          );

          return (
            <article className="certificate-item" data-reveal="scale" key={certificate.id}>
              {certificate.hasImage ? (
                <button
                  className="certificate-card"
                  type="button"
                  onClick={(event) => {
                    returnFocusRef.current = event.currentTarget;
                    setActive(imageIndex);
                  }}
                  aria-label={`View certificate: ${certificate.title}`}
                >
                  {content}
                </button>
              ) : (
                <div className="certificate-card certificate-card-static">
                  {content}
                  {certificate.url && (
                    <div className="certificate-footer">
                      <a
                        className="credential-link"
                        href={certificate.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View verified credential <FiExternalLink aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {certificate.hasImage && certificate.url && (
                <div className="certificate-external-bar">
                  <a
                    className="credential-link"
                    href={certificate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View verified credential <FiExternalLink aria-hidden="true" />
                  </a>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {current && createPortal(
        <div
          className="lightbox-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            className="certificate-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={caption(current)}
            ref={dialogRef}
          >
            <button ref={closeRef} type="button" className="lightbox-close" onClick={close} aria-label="Close certificate">
              <FiX />
            </button>
            {imageCertificates.length > 1 && (
              <button
                type="button"
                className="lightbox-arrow lightbox-prev"
                onClick={() => move(-1)}
                aria-label="Previous certificate"
              >
                <FiArrowLeft />
              </button>
            )}
            <div className="lightbox-image">
              <Image
                src={current.image}
                alt={caption(current)}
                fill
                sizes="90vw"
                priority={true}
                quality={90}
                style={{ objectFit: "contain" }}
              />
            </div>
            {imageCertificates.length > 1 && (
              <button
                type="button"
                className="lightbox-arrow lightbox-next"
                onClick={() => move(1)}
                aria-label="Next certificate"
              >
                <FiArrowRight />
              </button>
            )}
            <p className="lightbox-caption">{caption(current)}</p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
