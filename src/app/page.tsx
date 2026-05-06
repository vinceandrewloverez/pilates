"use client";
import React, { useState } from "react";

const routines = [
  {
    href: "/pushup",
    label: "Pushups",
    sub: "Strength · 20 min · 4 sets",
    lastDone: "2d ago",
    category: "Strength",
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
    category: "Core",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <path d="M2 12c0 4 4.5 8 10 8s10-4 10-8" />
        <path d="M12 4v16" />
      </svg>
    ),
  },
  {
    href: "/recovery",
    label: "Recovery Stretch",
    sub: "Recovery · 15 min · Gentle",
    lastDone: "1d ago",
    category: "Recovery",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
  },
];

const filters = ["All", "Strength", "Core", "Recovery"];

const CIRCUMFERENCE = 2 * Math.PI * 28;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0a;
    --surface: #141414;
    --surface2: #1e1e1e;
    --border: #242424;
    --text: #f0f0f0;
    --muted: #666;
    --dim: #3a3a3a;
    --accent: #f0f0f0;
    --font-display: 'Instrument Serif', Georgia, serif;
    --font-body: 'DM Sans', sans-serif;
    --font-mono: 'DM Mono', monospace;
  }

  body { background: var(--bg); }

  .page-root {
    min-height: 100svh;
    background: var(--bg);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    font-family: var(--font-body);
  }

  /* ── MOBILE (default, ≤ 639px) ── */
  .shell {
    width: 100%;
    max-width: 430px;
    min-height: 100svh;
    background: var(--bg);
    display: flex;
    flex-direction: column;
  }

  .status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 22px 0;
    font-size: 11px;
    font-weight: 600;
    color: var(--text);
    font-family: var(--font-mono);
  }

  .dynamic-island {
    width: 88px;
    height: 27px;
    background: #000;
    border-radius: 20px;
    margin: 10px auto 0;
  }

  .scroll-body {
    flex: 1;
    overflow-y: auto;
    padding: 20px 20px 0;
    scrollbar-width: none;
  }
  .scroll-body::-webkit-scrollbar { display: none; }

  .date-label {
    font-size: 11px;
    color: var(--muted);
    font-family: var(--font-mono);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .page-title {
    font-family: var(--font-display);
    font-size: 32px;
    font-style: italic;
    color: var(--text);
    letter-spacing: -0.5px;
    margin-bottom: 20px;
    line-height: 1.1;
  }

  .ring-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 18px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 18px;
  }

  .ring-text h3 {
    font-size: 14px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 4px;
  }

  .ring-text p {
    font-size: 12px;
    color: var(--muted);
    line-height: 1.55;
  }

  .filters {
    display: flex;
    gap: 6px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }

  .filter-pill {
    padding: 5px 13px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: var(--font-mono);
    transition: background 0.15s, color 0.15s;
  }

  .filter-pill.active { background: var(--text); color: var(--bg); }
  .filter-pill.inactive { background: var(--surface); color: var(--muted); border: 1px solid var(--border); }

  .section-label {
    font-size: 10px;
    font-weight: 500;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-family: var(--font-mono);
    margin: 14px 0 10px;
  }

  .routine-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 16px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 14px;
    text-decoration: none;
    transition: opacity 0.15s, background 0.15s;
  }
  .routine-card:hover { opacity: 0.75; }

  .routine-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: var(--surface2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .routine-info { flex: 1; min-width: 0; }

  .routine-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .routine-sub {
    font-size: 11px;
    color: var(--muted);
    font-family: var(--font-mono);
  }

  .routine-meta { text-align: right; flex-shrink: 0; }
  .routine-meta-label { font-size: 10px; color: var(--dim); margin-bottom: 2px; font-family: var(--font-mono); }
  .routine-meta-value { font-size: 11px; color: var(--muted); font-family: var(--font-mono); }

  .empty-state {
    text-align: center;
    color: var(--dim);
    font-size: 13px;
    padding: 32px 0;
    font-family: var(--font-mono);
  }

  .cta-btn {
    display: block;
    margin: 18px 0;
    background: var(--text);
    color: var(--bg);
    border-radius: 14px;
    padding: 15px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.2px;
    text-decoration: none;
    transition: opacity 0.15s;
  }
  .cta-btn:hover { opacity: 0.85; }

  .tab-bar {
    display: flex;
    justify-content: space-around;
    padding: 12px 8px 4px;
    border-top: 0.5px solid var(--border);
    background: var(--bg);
    position: sticky;
    bottom: 0;
  }

  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    cursor: pointer;
    padding: 4px 8px;
  }

  .tab-label {
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.05em;
    font-family: var(--font-mono);
    text-transform: uppercase;
  }

  .home-indicator {
    width: 96px;
    height: 4px;
    background: var(--border);
    border-radius: 2px;
    margin: 10px auto 14px;
  }

  /* ── TABLET / iPAD (640px – 1023px) ── */
  @media (min-width: 640px) {
    .page-root {
      padding: 40px 24px;
      align-items: flex-start;
    }

    .shell {
      max-width: 680px;
      min-height: unset;
      border-radius: 32px;
      border: 1px solid var(--border);
      overflow: hidden;
      box-shadow: 0 32px 80px rgba(0,0,0,0.6);
    }

    .status-bar { padding: 18px 28px 0; }
    .scroll-body { padding: 24px 28px 0; }

    .page-title { font-size: 40px; margin-bottom: 24px; }

    .ring-card { padding: 22px; border-radius: 22px; }

    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .two-col .routine-card { margin-bottom: 0; }

    .tab-bar { padding: 14px 24px 8px; }
    .home-indicator { margin: 12px auto 18px; }
  }

  /* ── DESKTOP (1024px+) ── */
  @media (min-width: 1024px) {
    .page-root {
      padding: 48px 32px;
      align-items: flex-start;
      justify-content: center;
    }

    .shell {
      max-width: 860px;
      width: 100%;
      border-radius: 36px;
    }

    .status-bar { display: none; }
    .dynamic-island { display: none; }

    .desktop-header {
      display: flex !important;
      align-items: center;
      justify-content: space-between;
      padding: 28px 36px 0;
      border-bottom: 0.5px solid var(--border);
      padding-bottom: 20px;
      margin-bottom: 0;
    }

    .desktop-logo {
      font-family: var(--font-display);
      font-style: italic;
      font-size: 20px;
      color: var(--text);
      letter-spacing: -0.3px;
    }

    .desktop-nav {
      display: flex;
      gap: 24px;
    }

    .desktop-nav a {
      font-size: 12px;
      color: var(--muted);
      text-decoration: none;
      font-family: var(--font-mono);
      letter-spacing: 0.06em;
      text-transform: uppercase;
      transition: color 0.15s;
    }
    .desktop-nav a:hover, .desktop-nav a.active { color: var(--text); }

    .scroll-body { padding: 32px 36px 0; }

    .desktop-grid {
      display: grid;
      grid-template-columns: 260px 1fr;
      gap: 28px;
      align-items: start;
    }

    .desktop-sidebar {}

    .desktop-main {}

    .page-title { font-size: 44px; margin-bottom: 28px; }

    .tab-bar { display: none !important; }
    .home-indicator { display: none; }

    .desktop-footer-spacer { height: 32px; }

    .three-col {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
    }
    .three-col .routine-card { margin-bottom: 0; }
  }
`;

export default function SelectionPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? routines
      : routines.filter((r) =>
          r.sub.toLowerCase().includes(activeFilter.toLowerCase())
        );

  const tabs = [
    {
      label: "Today", active: true,
      icon: (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
          <path d="M3 12l9-9 9 9" /><path d="M9 21V12h6v9" />
        </svg>
      ),
    },
    {
      label: "History", active: false,
      icon: (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
          <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      ),
    },
    {
      label: "Progress", active: false,
      icon: (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      label: "Profile", active: false,
      icon: (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      ),
    },
  ];

  const RoutineList = ({ cols }) => {
    const wrapClass = cols === 3 ? "three-col" : cols === 2 ? "two-col" : "";
    return (
      <div className={wrapClass || ""} style={wrapClass ? {} : {}}>
        {filtered.map((r) => (
          <a key={r.href} href={r.href} className="routine-card">
            <div className="routine-icon">{r.icon}</div>
            <div className="routine-info">
              <p className="routine-name">{r.label}</p>
              <p className="routine-sub">{r.sub}</p>
            </div>
            <div className="routine-meta">
              <p className="routine-meta-label">Last done</p>
              <p className="routine-meta-value">{r.lastDone}</p>
            </div>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" style={{ marginLeft: 4, flexShrink: 0 }}>
              <path d="M1 1l5 5-5 5" stroke="#3a3a3a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        ))}
        {filtered.length === 0 && (
          <p className="empty-state">No routines in this category yet.</p>
        )}
      </div>
    );
  };

  const RingCard = () => (
    <div className="ring-card">
      <div style={{ position: "relative", width: 68, height: 68, flexShrink: 0 }}>
        <svg width="68" height="68" viewBox="0 0 68 68" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="34" cy="34" r="28" stroke="#222" strokeWidth="7" fill="none" />
          <circle
            cx="34" cy="34" r="28"
            stroke="#f0f0f0" strokeWidth="7" fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * 0.25}
            strokeLinecap="round"
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#f0f0f0", lineHeight: 1, fontFamily: "DM Mono, monospace" }}>75%</span>
          <span style={{ fontSize: 8, color: "#555", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "DM Mono, monospace" }}>week</span>
        </div>
      </div>
      <div className="ring-text">
        <h3>On track this week</h3>
        <p>3 of 4 sessions done.<br />Keep the streak alive.</p>
      </div>
    </div>
  );

  const Filters = () => (
    <div className="filters">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setActiveFilter(f)}
          className={`filter-pill ${activeFilter === f ? "active" : "inactive"}`}
        >
          {f}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <style>{styles}</style>
      <main className="page-root">
        <div className="shell">

          {/* Desktop header (hidden on mobile/tablet via CSS) */}
          <div className="desktop-header" style={{ display: "none" }}>
            <span className="desktop-logo">Forma</span>
            <nav className="desktop-nav">
              <a href="#" className="active">Today</a>
              <a href="#">History</a>
              <a href="#">Progress</a>
              <a href="#">Profile</a>
            </nav>
          </div>

          {/* Mobile status bar */}
          <div className="status-bar">
            <span style={{ fontFamily: "DM Mono, monospace" }}>9:41</span>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <svg width="16" height="11" viewBox="0 0 16 11" fill="#f0f0f0">
                <rect x="0" y="4" width="3" height="7" rx="1" />
                <rect x="4.5" y="2.5" width="3" height="8.5" rx="1" />
                <rect x="9" y="0.5" width="3" height="10.5" rx="1" />
                <rect x="13.5" y="0" width="3" height="11" rx="1" opacity="0.3" />
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#f0f0f0" strokeOpacity="0.35" />
                <rect x="1.5" y="1.5" width="16" height="9" rx="2.5" fill="#f0f0f0" />
                <path d="M23 4v4a2 2 0 0 0 0-4z" fill="#f0f0f0" fillOpacity="0.4" />
              </svg>
            </div>
          </div>

          {/* Dynamic island */}
          <div className="dynamic-island" />

          {/* Scrollable body */}
          <div className="scroll-body">
            <p className="date-label">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
            <h1 className="page-title">Daily Training</h1>

            {/* Desktop: sidebar layout */}
            <div className="desktop-grid">
              <div className="desktop-sidebar">
                <RingCard />
                <Filters />
              </div>

              <div className="desktop-main">
                {/* On mobile/tablet, show ring + filters inline (sidebar is hidden) */}
                <div className="mobile-only-ring">
                  <RingCard />
                  <Filters />
                </div>

                <p className="section-label">Routines</p>

                {/* Mobile: single col, tablet: 2-col, desktop: handled above */}
                <div className="mobile-list"><RoutineList cols={1} /></div>
                <div className="tablet-list"><RoutineList cols={2} /></div>
                <div className="desktop-list"><RoutineList cols={1} /></div>

                <a href={filtered[0]?.href ?? "/"} className="cta-btn">
                  Start today's session →
                </a>
              </div>
            </div>

            <div className="desktop-footer-spacer" />
          </div>

          {/* Mobile / tablet tab bar */}
          <div className="tab-bar">
            {tabs.map((tab) => (
              <div key={tab.label} className="tab-item">
                {tab.icon(tab.active ? "#f0f0f0" : "#444")}
                <span className="tab-label" style={{ color: tab.active ? "#f0f0f0" : "#444" }}>{tab.label}</span>
              </div>
            ))}
          </div>

          <div className="home-indicator" />
        </div>
      </main>

      {/* Responsive layout switches */}
      <style>{`
        /* Mobile-only elements */
        .mobile-only-ring { display: block; }
        .desktop-sidebar { display: none; }
        .desktop-grid { display: block; }
        .mobile-list { display: block; }
        .tablet-list { display: none; }
        .desktop-list { display: none; }

        @media (min-width: 640px) {
          .tablet-list { display: block; }
          .mobile-list { display: none; }
        }

        @media (min-width: 1024px) {
          .mobile-only-ring { display: none; }
          .desktop-sidebar { display: block; }
          .desktop-grid { display: grid; }
          .tablet-list { display: none; }
          .desktop-list { display: block; }
        }
      `}</style>
    </>
  );
}
