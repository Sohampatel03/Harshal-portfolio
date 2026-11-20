"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

export default function CopyEmailButton({ email }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback ignored if clipboard permission unavailable
    }
  };

  return (
    <button
      type="button"
      className={`copy-email-btn${copied ? " is-copied" : ""}`}
      onClick={handleCopy}
      aria-label={copied ? "Email copied to clipboard" : `Copy ${email}`}
    >
      {copied ? (
        <>
          <FiCheck aria-hidden="true" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <FiCopy aria-hidden="true" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
