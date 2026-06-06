# CAPS Website Redesign Design Specification

* **Date:** 2026-06-02
* **Project Root:** `/Users/rahulmodi/Desktop/CAPS WEB`
* **Target Website:** [https://caps.christuniversity.in](https://caps.christuniversity.in)
* **Goal:** Redesign the CAPS website with a premium academic portal look that matches the layout of the official site, replacing the sterile "AI / SaaS" feel with a warm, prestigious, and highly interactive user experience.

---

## 1. Design Philosophy & Visual Upgrades

To move away from the generic "AI template" look and align with a high-fidelity university portal, we are establishing the following changes:

### A. Academic & Editorial Typography
* **Headings:** `EB Garamond` (imported via Google Fonts). This serif typeface brings classic prestige, trust, and history, aligning with Christ University's branding.
* **Body:** `Inter` (sans-serif). Provides high readability, clean spacing, and modern compatibility.

### B. Immersive Hero Landing
* **Student/Campus Photo Background:** Replaced abstract spotlights and grid patterns with a faded real photo background of campus/student life. A rich navy overlay gradient maintains contrast for all foreground content.
* **Layout Integrity:** Replicates the official landing grid:
  * **Left Column:** Refined CAPS logo and long descriptive brand paragraph, with a horizontal rule below.
  * **Right Column:** Floating glassmorphic carousel displaying the "10 Years of CAPS" announcement. Users can navigate through multiple slide announcements using sleek chevrons.
  * **Overlapping Campus Strip:** The "CAMPUS NETWORK" section is integrated as a horizontal strip overlapping the bottom of the hero. Clicking a campus scrolls smoothly to the map details below and sets it as active.

### C. Portal Navigation (Top Header & Menu Sidebar)
* **Header Bar:** Transparent at the top (overlaying the hero photo), turning opaque with blur backdrop-filter on scroll.
* **Side-Drawer Menu:** Clicking the `Menu ☰` button at the top right slides out a premium full-height sheet displaying all internal section links, external campus portals, and contact links.

### D. Rich Service Drawers (Detail sheets)
* Refined services to match the official offerings (Writing Centre, Classroom Peer Training, Online Learning Lab, Psychometric Assessment, Industry Connect).
* Clicking any service opens a structured drawer (`Sheet` component) displaying:
  * **Full Description**
  * **Core Offerings Checklist**
  * **Venue & Coordination Details** (e.g. Floor 9 Central Block, Room 1006)
  * **Direct Calls-to-Action** ("Book a Slot", "Access Lab Modules")

---

## 2. Directory Layout & Key Components

```
/Users/rahulmodi/Desktop/CAPS WEB/
│
├── app/
│   ├── layout.tsx         # Global wrappers (Loads Inter & EB_Garamond fonts)
│   ├── page.tsx           # Home Page (acts as our core scrollable SPA viewport)
│   └── globals.css        # Tailwind directives + Brand custom variables
│
├── components/
│   ├── ui/                # shadcn/ui components (sheet, button, card)
│   ├── header-navigation.tsx # Navigation header with Sidebar Menu
│   ├── hero-section.tsx   # Premium photo-bg landing layout with Campus Network strip
│   ├── about-section.tsx  # Editorial spread for About, Vision, and Mission
│   ├── objectives-section.tsx # Styled objectives checklist
│   ├── services-grid.tsx  # Services selector opening detailed drawers
│   ├── campus-network.tsx # Interactive grid of campuses + Leaflet map
│   ├── alumni-marquee.tsx # Infinite scrolling alumni ribbon
│   └── testimonial-slider.tsx # Responsive testimonial carousel
│
└── config/
    └── data.ts            # Separated content data (Testimonials list, Alumni profiles, Team info)
```

---

## 3. Colors & Design Tokens (Tailwind v4)

We define our color variables in `globals.css`:
* **Primary Navy Blue (`#20315f` / `--color-primary-navy`):** Used for base text, headings, and headers.
* **Accent Gold (`#bb8d2f` / `--color-accent-gold`):** Matches the vertical separator in the CAPS logo. Used for highlights, active tabs, and primary buttons.
* **Secondary Slate (`#161b33`):** High contrast background color for drawers and cards.
* **Glassmorphism Overlay:** `bg-white/5 backdrop-blur-md border border-white/10` with custom glow shadows.

---

## 4. Verification Plan

1. **Local Build:** Ensure the app compiles cleanly under Next.js and starts.
2. **Layout Review:** Check student photo rendering, overlay opacity, and text alignment.
3. **Interactive Testing:**
   * Test the "10 Years of CAPS" announcement slide navigation.
   * Test campus card clicks (verify scrolling and map coordinate update).
   * Test service card clicks (verify slide-out drawer rendering details).
   * Test sidebar menu slide-out.
4. **Responsive Integrity:** Check scaling and gutters on 375px (mobile), 768px (tablet), and 1200px+ (desktop).
