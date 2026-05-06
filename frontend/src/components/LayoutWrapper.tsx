"use client";

import Navigation from "./Navigation";
import { useEffect, useState } from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved) setIsCollapsed(saved === "true");
  }, []);

  const toggle = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  };

  return (
    <body className="min-h-full flex bg-[var(--tt-canvas)] overflow-hidden">
      <Navigation isCollapsed={isCollapsed} setIsCollapsed={toggle} />
      <main className="flex-1 h-screen overflow-y-auto relative">
        {/* Ambient canvas — single source of background atmosphere */}
        <div aria-hidden className="pointer-events-none absolute inset-0 tt-canvas-glow" />
        <div aria-hidden className="pointer-events-none absolute inset-0 tt-grid opacity-40" />
        <div className="relative z-10">{children}</div>
      </main>
    </body>
  );
}
