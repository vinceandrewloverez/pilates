"use client";
import React, { useState } from "react";

const routines = [
  {
    href: "/pushup",
    label: "Pushups",
    sub: "Strength · 20 min · 4 sets",
    lastDone: "2d ago",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15l4-4 4 4 4-8 2 4" />
        <path d="M2 19h20" />
      </svg>
    ),
  },
  {
    href: "/pilates",
    label: "Pilates",
    sub: "Core · 30 min · Flow",
    lastDone: "4d ago",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <path d="M2 12c0 4 4.5 8 10 8s10-4 10-8" />
        <path d="M12 4v16" />
      </svg>
    ),
  },
];

const filters = ["All", "Strength", "Core", "Recovery"];

const CIRCUMFERENCE = 2 * Math.PI * 28; // r=28

export default function SelectionPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? routines
      : routines.filter((r) =>
          r.sub.toLowerCase().includes(activeFilter.toLowerCase())
        );

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: "#0f0f0f" }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 390,
          background: "#0f0f0f",
          borderRadius: 40,
          overflow: "hidden",
          border: "1px solid #1c1c1c",
        }}
      >
        {/* Status bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 24px 0",
            fontSize: 11,
            fontWeight: 600,
            color: "#fff",
            fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          <span>9:41</span>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <svg width="16" height="11" viewBox="0 0 16 11" fill="#fff">
              <rect x="0" y="4" width="3" height="7" rx="1" />
              <rect x="4.5" y="2.5" width="3" height="8.5" rx="1" />
              <rect x="9" y="0.5" width="3" height="10.5" rx="1" />
              <rect x="13.5" y="0" width="3" height="11" rx="1" opacity="0.3" />
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#fff" strokeOpacity="0.35" />
              <rect x="1.5" y="1.5" width="16" height="9" rx="2.5" fill="#fff" />
              <path d="M23 4v4a2 2 0 0 0 0-4z" fill="#fff" fillOpacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Dynamic island */}
        <div
          style={{
            width: 90,
            height: 28,
            background: "#000",
            borderRadius: 20,
            margin: "10px auto 0",
          }}
        />

        <div style={{ padding: "20px 22px 0" }}>
          {/* Header */}
          <p
            style={{
              fontSize: 13,
              color: "#888",
              fontWeight: 400,
              marginBottom: 2,
              fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.5px",
              marginBottom: 20,
              fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Daily Training
          </h1>

          {/* Weekly ring summary */}
          <div
            style={{
              background: "#1c1c1e",
              borderRadius: 20,
              padding: "18px",
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div style={{ position: "relative", width: 68, height: 68, flexShrink: 0 }}>
              <svg
                width="68"
                height="68"
                viewBox="0 0 68 68"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle cx="34" cy="34" r="28" stroke="#2a2a2a" strokeWidth="7" fill="none" />
                <circle
                  cx="34"
                  cy="34"
                  r="28"
                  stroke="#fff"
                  strokeWidth="7"
                  fill="none"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={CIRCUMFERENCE * 0.25}
                  strokeLinecap="round"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1,
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  75%
                </span>
                <span
                  style={{
                    fontSize: 9,
                    color: "#666",
                    marginTop: 1,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  week
                </span>
              </div>
            </div>
            <div>
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#fff",
                  marginBottom: 3,
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                On track this week
              </h3>
              <p
                style={{
                  fontSize: 12,
                  color: "#888",
                  lineHeight: 1.5,
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                3 of 4 sessions done.
                <br />
                Keep the streak alive.
              </p>
            </div>
          </div>

          {/* Filter pills */}
          <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: "5px 12px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 500,
                  background: activeFilter === f ? "#fff" : "#1c1c1e",
                  color: activeFilter === f ? "#0f0f0f" : "#888",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                  transition: "background 0.15s, color 0.15s",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Section label */}
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#888",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              margin: "16px 0 10px",
              fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Routines
          </p>

          {/* Routine cards */}
          {filtered.map((r) => (
            <a
              key={r.href}
              href={r.href}
              style={{
                background: "#1c1c1e",
                borderRadius: 20,
                padding: "18px",
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                gap: 16,
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  background: "#2a2a2a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {r.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: 2,
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  {r.label}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#888",
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  {r.sub}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontSize: 11,
                    color: "#555",
                    marginBottom: 2,
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  Last done
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#888",
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  {r.lastDone}
                </p>
              </div>
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                style={{ marginLeft: 4 }}
              >
                <path
                  d="M1 1l5 5-5 5"
                  stroke="#444"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          ))}

          {filtered.length === 0 && (
            <p
              style={{
                textAlign: "center",
                color: "#555",
                fontSize: 13,
                padding: "24px 0",
                fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              No routines in this category yet.
            </p>
          )}

          {/* CTA */}
          <a
            href={filtered[0]?.href ?? "/"}
            style={{
              display: "block",
              margin: "20px 0",
              background: "#fff",
              color: "#0f0f0f",
              borderRadius: 16,
              padding: 16,
              textAlign: "center",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "-0.2px",
              textDecoration: "none",
              fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Start today's session
          </a>
        </div>

        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "14px 10px 4px",
            borderTop: "0.5px solid #222",
          }}
        >
          {[
            {
              label: "Today",
              active: true,
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M3 12l9-9 9 9" /><path d="M9 21V12h6v9" />
                </svg>
              ),
            },
            {
              label: "History",
              active: false,
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              ),
            },
            {
              label: "Progress",
              active: false,
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              ),
            },
            {
              label: "Profile",
              active: false,
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              ),
            },
          ].map((tab) => (
            <div
              key={tab.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                cursor: "pointer",
              }}
            >
              {tab.icon}
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  color: tab.active ? "#fff" : "#555",
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                {tab.label}
              </span>
            </div>
          ))}
        </div>

        {/* Home indicator */}
        <div
          style={{
            width: 100,
            height: 4,
            background: "#333",
            borderRadius: 2,
            margin: "14px auto 16px",
          }}
        />
      </div>
    </main>
  );
}
