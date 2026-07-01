"use client";

/**
 * TeamLeadSlider
 * Infinite-scrolling marquee of team leads — navy/cream editorial theme.
 */

import React from "react";

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w: string) => w[0]?.toUpperCase())
    .join("");
}

const DEFAULT_LEADS = [
  { id: 1,  name: "Taanya L",          wing: "Connect Wide" },
  { id: 2,  name: "Bhadra Mahesh",      wing: "Group Peer Training" },
  { id: 3,  name: "Shristi Dam",        wing: "Group Peer Training" },
  { id: 4,  name: "Architha B",         wing: "Learning & Development" },
  { id: 5,  name: "Sanjna Prasanna",    wing: "Learning & Development" },
  { id: 6,  name: "Shivam Kanjaria",    wing: "Media & PR" },
  { id: 7,  name: "Dharma Viradia",     wing: "One on One Peer Training" },
  { id: 8,  name: "Shreya Datta",       wing: "One on One Peer Training" },
  { id: 9,  name: "Devansh Bhardwaj",   wing: "Operations & Analytics" },
  { id: 10, name: "Kasheeka Gupta",     wing: "Operations & Analytics" },
  { id: 11, name: "Samanthira Dhevi",   wing: "Research & Assessment" },
  { id: 12, name: "Veer Khanna",        wing: "Tech Tank" },
  { id: 13, name: "Rahul Modi",         wing: "Tech Tank" },
  { id: 14, name: "Team Lead 14",       wing: "TBD" },
  { id: 15, name: "Team Lead 15",       wing: "TBD" },
  { id: 16, name: "Team Lead 16",       wing: "TBD" },
];

interface Lead {
  id: number;
  name: string;
  wing: string;
  photo?: string;
}

interface TeamLeadSliderProps {
  leads?: Lead[];
  speed?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export default function TeamLeadSlider({
  leads = DEFAULT_LEADS,
  speed = 80,
  eyebrow = "Outreach & Execution",
  title = "Team Leads",
  subtitle = "Our team leads drive peer coaching sessions, content development, systems administration, and student outreach campaigns.",
}: TeamLeadSliderProps) {
  const loopLeads = [...leads, ...leads];

  return (
    <section className="tls-section">
      {(eyebrow || title) && (
        <div className="tls-heading">
          {eyebrow && (
            <span className="tls-eyebrow">
              <span className="tls-asterisk" aria-hidden="true">✳</span>
              {eyebrow}
            </span>
          )}
          {title && <h2 className="tls-title">{title}</h2>}
          {subtitle && <p className="tls-subtitle">{subtitle}</p>}
        </div>
      )}

      <div className="tls-viewport">
        <div
          className="tls-track"
          style={{ "--tls-duration": `${speed}s` } as React.CSSProperties}
          aria-hidden="true"
        >
          {loopLeads.map((lead, i) => (
            <article className="tls-card" key={`${lead.id}-${i}`}>
              <div className="tls-photo-wrap">
                <span className="tls-glow" aria-hidden="true" />
                {lead.photo ? (
                  <img
                    src={lead.photo}
                    alt={lead.name}
                    className="tls-photo"
                    loading="lazy"
                    draggable={false}
                  />
                ) : (
                  <span className="tls-initials">{getInitials(lead.name)}</span>
                )}
              </div>
              <div className="tls-info">
                <p className="tls-wing">{lead.wing}</p>
                <h3 className="tls-name">{lead.name}</h3>
              </div>
            </article>
          ))}
        </div>
        <div className="tls-fade tls-fade-left" aria-hidden="true" />
        <div className="tls-fade tls-fade-right" aria-hidden="true" />
      </div>

      <style jsx>{`
        .tls-section {
          --cream: #f7f5ef;
          --navy-deep: #0d1830;
          --navy-mid: #16264a;
          --navy-line: rgba(255, 255, 255, 0.08);
          --glow: rgba(196, 155, 92, 0.4);
          --purple: #7c6fce;
          --heading-navy: #17264a;
          --muted: #6b7180;
          background: var(--cream);
          padding: 80px 0 96px;
          overflow: hidden;
          width: 100%;
        }
        .tls-heading {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 48px;
          padding: 0 24px;
        }
        .tls-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--_text-base---font--body), "Inter", system-ui, sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--heading-navy);
          margin-bottom: 14px;
        }
        .tls-asterisk { color: var(--purple); font-size: 16px; line-height: 1; }
        .tls-title {
          font-family: var(--_text-base---font--display), "Playfair Display", Georgia, serif;
          font-style: italic;
          font-weight: 600;
          font-size: clamp(34px, 5vw, 56px);
          color: var(--heading-navy);
          letter-spacing: -0.01em;
          margin: 0 0 18px;
        }
        .tls-subtitle {
          font-family: var(--_text-base---font--body), "Inter", system-ui, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: var(--muted);
          margin: 0;
        }
        .tls-viewport { position: relative; width: 100%; overflow: hidden; }
        .tls-track {
          display: flex;
          gap: 24px;
          width: max-content;
          padding: 4px 24px;
          animation: tls-scroll var(--tls-duration, 40s) linear infinite;
        }
        .tls-viewport:hover .tls-track { animation-play-state: paused; }
        @keyframes tls-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .tls-card {
          flex: 0 0 auto;
          width: 236px;
          border-radius: 18px;
          overflow: hidden;
          background: linear-gradient(165deg, var(--navy-deep) 0%, var(--navy-mid) 100%);
          border: 1px solid var(--navy-line);
          box-shadow: 0 20px 45px -28px rgba(13, 24, 48, 0.65);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .tls-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 26px 55px -24px rgba(13, 24, 48, 0.75);
        }
        .tls-photo-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .tls-glow {
          position: absolute;
          top: 8%; left: 50%;
          width: 70%;
          aspect-ratio: 1 / 1;
          transform: translateX(-50%);
          background: radial-gradient(circle, var(--glow) 0%, transparent 70%);
          filter: blur(6px);
        }
        .tls-initials {
          position: relative;
          font-family: var(--_text-base---font--body), "Inter", system-ui, sans-serif;
          font-weight: 700;
          font-size: 44px;
          letter-spacing: 0.02em;
          color: #e7e9f0;
        }
        .tls-photo { position: relative; width: 100%; height: 100%; object-fit: cover; display: block; }
        .tls-info { padding: 16px 20px 22px; border-top: 1px solid var(--navy-line); text-align: center; }
        .tls-wing {
          font-family: var(--_text-base---font--body), "Inter", system-ui, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #9aa3ba;
          margin: 0 0 6px;
        }
        .tls-name {
          font-family: var(--_text-base---font--body), "Inter", system-ui, sans-serif;
          font-weight: 600;
          font-size: 18px;
          color: #f4f2ea;
          margin: 0;
        }
        .tls-fade { position: absolute; top: 0; bottom: 0; width: 96px; pointer-events: none; z-index: 2; }
        .tls-fade-left  { left:  0; background: linear-gradient(90deg,  var(--cream) 0%, transparent 100%); }
        .tls-fade-right { right: 0; background: linear-gradient(270deg, var(--cream) 0%, transparent 100%); }
        @media (max-width: 640px) {
          .tls-card { width: 176px; }
          .tls-initials { font-size: 32px; }
          .tls-fade { width: 48px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tls-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
