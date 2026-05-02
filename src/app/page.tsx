"use client";
import React from "react";

export default function SelectionPage() {
  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden"
      style={{ background: "#0f0f0f" }}
    >
      {/* Header */}
      <div className="text-center mb-12 z-10">
        <p
          className="text-xs font-medium uppercase tracking-[0.25em] mb-3"
          style={{ color: "#555" }}
        >
          Daily Training
        </p>
        <h1
          className="leading-none mb-4"
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(52px, 12vw, 88px)",
            letterSpacing: "0.02em",
            color: "#fff",
            lineHeight: 0.92,
          }}
        >
          Choose<br />Your Path
        </h1>
        <p className="text-sm font-light" style={{ color: "#555", letterSpacing: "0.02em" }}>
          Select a routine to begin your session
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl z-10">
        {/* Pushup */}
        <a href="/pushup" className="group relative h-72 rounded-2xl overflow-hidden flex flex-col justify-end p-7 transition-transform duration-300 hover:-translate-y-1.5 active:scale-[0.97]" style={{ background: "#fff" }}>
          <span
            className="absolute top-0 right-5 pointer-events-none select-none transition-transform duration-300 group-hover:-translate-y-2"
            style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 140, lineHeight: 1, color: "#f0f0f0" }}
          >
            01
          </span>
          <div
            className="absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ background: "#0f0f0f" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
          <span className="relative z-10 block leading-none" style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 38, letterSpacing: "0.04em", color: "#0f0f0f" }}>
            Pushups
          </span>
          <span className="relative z-10 mt-1.5 text-xs uppercase tracking-[0.12em]" style={{ color: "#999" }}>
            Strength &amp; Power
          </span>
        </a>

        {/* Pilates */}
        <a href="/pilates" className="group relative h-72 rounded-2xl overflow-hidden flex flex-col justify-end p-7 transition-transform duration-300 hover:-translate-y-1.5 active:scale-[0.97]" style={{ background: "#0f0f0f", border: "1px solid #222" }}>
          <span
            className="absolute top-0 right-5 pointer-events-none select-none transition-transform duration-300 group-hover:-translate-y-2"
            style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 140, lineHeight: 1, color: "#1a1a1a" }}
          >
            02
          </span>
          <div
            className="absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ background: "#222" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
          <span className="relative z-10 block leading-none" style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 38, letterSpacing: "0.04em", color: "#fff" }}>
            Pilates
          </span>
          <span className="relative z-10 mt-1.5 text-xs uppercase tracking-[0.12em]" style={{ color: "#444" }}>
            Core &amp; Stability
          </span>
        </a>
      </div>

      {/* Footer */}
      <p className="mt-10 text-[10px] font-medium uppercase tracking-[0.3em] z-10" style={{ color: "#2a2a2a" }}>
        Stay Consistent &bull; Stay Strong
      </p>
    </main>
  );
}
