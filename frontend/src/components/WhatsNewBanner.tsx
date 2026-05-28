"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sparkles, X, ArrowRight } from "lucide-react";

/**
 * Top-of-app "What's new" banner.
 *
 * Curated, hand-maintained — bump `RELEASE_TAG` whenever the highlights below
 * change, and the banner re-appears for everyone (including users who
 * dismissed the previous tag). Per-tag dismissal lives in localStorage so a
 * user only sees each set of highlights once.
 *
 * Intentionally lightweight: no network calls, no GitHub API. Just a friendly
 * pointer at the newest user-facing surfaces. When we want a true update
 * checker (GitHub releases polling) this component can be replaced or extended.
 */

const RELEASE_TAG = "2026-05-28";
const STORAGE_KEY = "tt-whats-new-dismissed";

interface Highlight {
  label: string;
  href: string;
}

const HIGHLIGHTS: Highlight[] = [
  { label: "Session trace summaries", href: "/sessions" },
  { label: "Summarizer settings",     href: "/settings" },
];

export default function WhatsNewBanner() {
  // `null` = haven't read localStorage yet → render nothing (avoids SSR/CSR
  // flash where the banner appears for a frame before being dismissed).
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const dismissedTag = window.localStorage.getItem(STORAGE_KEY);
      setVisible(dismissedTag !== RELEASE_TAG);
    } catch {
      // Storage blocked (Safari ITP, private mode). Show it; we just can't
      // remember the dismissal across sessions.
      setVisible(true);
    }
  }, []);

  function dismiss() {
    try { window.localStorage.setItem(STORAGE_KEY, RELEASE_TAG); } catch { /* ignore */ }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="What's new in TokenTelemetry"
      className="relative flex items-center gap-3 border-b border-[var(--tt-border)] bg-[linear-gradient(90deg,rgba(96,165,250,0.10),rgba(96,165,250,0.02))] px-4 sm:px-6 py-2"
    >
      <span className="inline-flex items-center gap-1.5 shrink-0 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--tt-brand)]">
        <Sparkles size={12} />
        New
      </span>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 min-w-0 flex-1 text-[12.5px] text-[var(--tt-fg)]">
        <span className="text-[var(--tt-fg-muted)]">Just shipped:</span>
        {HIGHLIGHTS.map((h, i) => (
          <Link
            key={h.href}
            href={h.href}
            className="inline-flex items-center gap-1 font-medium text-[var(--tt-fg)] hover:text-[var(--tt-brand)] transition-colors"
          >
            {h.label}
            <ArrowRight size={11} className="opacity-60" />
            {i < HIGHLIGHTS.length - 1 && (
              <span aria-hidden className="ml-2 text-[var(--tt-fg-faint)]">·</span>
            )}
          </Link>
        ))}
      </div>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss what's new"
        className="shrink-0 h-7 w-7 grid place-items-center rounded-md text-[var(--tt-fg-muted)] hover:text-[var(--tt-fg)] hover:bg-[var(--tt-panel)] transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}
