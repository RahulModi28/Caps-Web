"use client";

import { useState, useEffect } from "react";

export default function MentorCardControls() {
  const [maxWidth, setMaxWidth] = useState(600);   // start high = no constraint
  const [minHeight, setMinHeight] = useState(300); // start low = no constraint
  const [isDirty, setIsDirty] = useState(false);   // only inject CSS after user drags
  const [open, setOpen] = useState(true);

  /* Only inject overrides after the user actually touches a slider */
  useEffect(() => {
    const id = "mentor-card-controls-style";
    let el = document.getElementById(id) as HTMLStyleElement | null;
    if (!isDirty) {
      // Remove any previously injected style so natural CSS wins
      if (el) el.textContent = "";
      return;
    }
    if (!el) {
      el = document.createElement("style");
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = `
      .placeholder-mesh-card {
        max-width: ${maxWidth}px !important;
        min-height: ${minHeight}px !important;
      }
      .info-block_image_component {
        max-width: ${maxWidth}px !important;
      }
    `;
  }, [maxWidth, minHeight, isDirty]);

  /* Only show in dev */
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div style={styles.wrapper}>
      {/* Toggle button */}
      <button onClick={() => setOpen((p) => !p)} style={styles.toggle}>
        {open ? "✕" : "🎛️ Card Size"}
      </button>

      {open && (
        <div style={styles.panel}>
          <p style={styles.title}>🎛️ Mentor Card Size</p>

          {/* Max-width slider */}
          <label style={styles.label}>
            <span>Max width</span>
            <span style={styles.value}>{maxWidth}px</span>
          </label>
          <input
            type="range"
            min={200}
            max={600}
            step={10}
            value={maxWidth}
            onChange={(e) => { setIsDirty(true); setMaxWidth(Number(e.target.value)); }}
            style={styles.range}
          />

          {/* Min-height slider */}
          <label style={styles.label}>
            <span>Min height</span>
            <span style={styles.value}>{minHeight}px</span>
          </label>
          <input
            type="range"
            min={200}
            max={700}
            step={10}
            value={minHeight}
            onChange={(e) => { setIsDirty(true); setMinHeight(Number(e.target.value)); }}
            style={styles.range}
          />

          {/* Copy values button */}
          <button
            style={styles.copy}
            onClick={() => {
              const snippet = `max-width: ${maxWidth}px; min-height: ${minHeight}px;`;
              navigator.clipboard.writeText(snippet);
            }}
          >
            📋 Copy values
          </button>

          <p style={styles.hint}>Changes apply live. Copy & paste into body.html when happy.</p>
        </div>
      )}
    </div>
  );
}

/* ─── inline styles ─────────────────────────────────────────────────── */
const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: "fixed",
    bottom: 24,
    right: 24,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 8,
    fontFamily: "'DM Sans', system-ui, sans-serif",
  },
  toggle: {
    background: "#1a1440",
    color: "#fff",
    border: "none",
    borderRadius: 999,
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
  },
  panel: {
    background: "#1a1440ee",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 16,
    padding: "20px 24px",
    width: 280,
    color: "#fff",
    boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  title: {
    margin: 0,
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: "0.01em",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    paddingBottom: 10,
  },
  label: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    opacity: 0.75,
    marginBottom: 2,
  },
  value: {
    fontWeight: 700,
    opacity: 1,
    color: "#a78bfa",
  },
  range: {
    width: "100%",
    accentColor: "#7c3aed",
    cursor: "pointer",
  },
  copy: {
    marginTop: 4,
    background: "rgba(124,58,237,0.25)",
    border: "1px solid rgba(124,58,237,0.5)",
    borderRadius: 8,
    color: "#c4b5fd",
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
  },
  hint: {
    margin: 0,
    fontSize: 10,
    opacity: 0.45,
    lineHeight: 1.5,
  },
};
