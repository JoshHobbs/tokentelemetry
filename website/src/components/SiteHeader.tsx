"use client";
import Link from "next/link";
import { Activity, GitBranch } from "lucide-react";

const NAV = [
  { label: "Hermes",    href: "#hermes" },
  { label: "Features",  href: "#features" },
  { label: "Agents",    href: "#agents" },
  { label: "FAQ",       href: "#faq" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--tt-border)] bg-[var(--tt-canvas)]/80 backdrop-blur supports-[backdrop-filter]:bg-[var(--tt-canvas)]/60">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5 min-w-0">
          <span className="h-7 w-7 grid place-items-center rounded-[var(--tt-radius)] bg-gradient-to-br from-[var(--tt-brand)] to-[var(--tt-brand-deep)] shadow-[0_0_18px_-4px_var(--tt-brand-glow)]">
            <Activity size={14} strokeWidth={2.5} className="text-white" />
          </span>
          <span className="font-semibold tracking-[-0.01em] text-[var(--tt-fg)] text-[14px]">TokenTelemetry</span>
          <span className="hidden sm:inline px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--tt-fg-dim)] border border-[var(--tt-border)]">v1</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}
              className="px-3 h-8 inline-flex items-center rounded-[var(--tt-radius)] text-[13px] text-[var(--tt-fg-muted)] hover:text-[var(--tt-fg)] hover:tt-tint-1 transition-colors">
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="https://github.com/VasiHemanth/tokentelemetry"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 h-8 px-3 rounded-[var(--tt-radius)] text-[12px] font-medium text-[var(--tt-fg)] border border-[var(--tt-border-strong)] hover:tt-tint-1 transition-colors"
        >
          <GitBranch size={14} />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </header>
  );
}
