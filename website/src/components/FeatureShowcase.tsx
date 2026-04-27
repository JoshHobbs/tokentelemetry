"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FEATURES } from "@/data/features";
import { Check } from "lucide-react";

export default function FeatureShowcase() {
  const [active, setActive] = useState(FEATURES[0].id);
  const feature = FEATURES.find((f) => f.id === active)!;

  return (
    <section id="features" className="max-w-[1400px] mx-auto px-6 py-24">
      <div className="text-center mb-10">
        <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.3em] mb-3">What you&apos;ll see</p>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
          One dashboard. Every agent.
        </h2>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {FEATURES.map((f) => (
          <button
            key={f.id}
            onClick={() => setActive(f.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              active === f.id
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-10">
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight text-center max-w-3xl mx-auto leading-tight">
              {feature.headline}
            </h3>
          </div>

          <div className="relative mb-12">
            <div className="absolute -inset-x-8 -inset-y-6 bg-gradient-to-tr from-blue-500/10 via-transparent to-emerald-500/10 blur-3xl pointer-events-none" />
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 shadow-[0_30px_120px_-20px_rgba(37,99,235,0.4)] overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-900/80 border-b border-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                <span className="ml-3 text-[10px] font-mono text-slate-500 truncate">tokentelemetry · {feature.label.toLowerCase()}</span>
              </div>
              <img
                src={feature.screenshot}
                alt={feature.label}
                className="w-full h-auto block"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {feature.bullets.map((b, i) => (
              <div
                key={i}
                className="flex gap-3 p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <span className="mt-0.5 w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Check size={13} className="text-emerald-400" strokeWidth={3} />
                </span>
                <p className="text-slate-300 text-sm leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
