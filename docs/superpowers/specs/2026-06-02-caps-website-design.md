# CAPS Website Redesign Design Specification

* **Date:** 2026-06-02
* **Project Root:** `/Users/rahulmodi/Desktop/CAPS WEB`
* **Target Website:** [https://caps.christuniversity.in](https://caps.christuniversity.in)
* **Goal:** Redesign the CAPS website with identical content, using a state-of-the-art visual style, dynamic animations, and forward compatibility for a future CMS.

---

## 1. Technology Stack

* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (v4)
* **Component Library:** shadcn/ui (Radix UI primitives)
* **Interactive Maps:** Leaflet.js (dynamically imported client-side only)
* **Animations:** Framer Motion (for smooth slide-out drawers, scroll animations, and carousel transitions)

---

## 2. Brand Identity & Design Tokens

We will use CSS variables inside `globals.css` to define our core brand assets:

* **Primary Navy Blue (`#20315f` / `--color-primary`):** Used for base text, major headings, and dark headers. Matches Christ University's identity.
* **Accent Ochre Gold (`#bb8d2f` / `--color-accent`):** Matches the vertical separator in the CAPS logo. Used for highlights, buttons, and border lines.
* **Secondary Light Gray (`#f9f9f9` / `--color-bg-light`):** Default warm background color.
* **Secondary Dark Slate (`#161b33` / `--color-bg-dark`):** Used for footer, inputs, and drawers.

---

## 3. Directory Layout

```
/Users/rahulmodi/Desktop/CAPS WEB/
│
├── app/
│   ├── layout.tsx         # Global wrappers (Google Font: Inter, metadata, theme providers)
│   ├── page.tsx           # Home Page (acts as our core scrollable SPA viewport)
│   ├── globals.css        # Tailwind directives + Brand CSS custom variables
│   └── api/
│       └── contact/route.ts # API endpoint to handle contact form submissions
│
├── components/
│   ├── ui/                # shadcn/ui components (installed via CLI: sheet, button, card, dialog)
│   ├── campus-network.tsx # Interactive grid of campuses + Leaflet map
│   ├── services-grid.tsx  # Dynamic hover services list
│   ├── testimonial-slider.tsx # Responsive drag-and-swipe testimonial carousel
│   ├── slide-drawer.tsx   # Custom sheet drawer component for sub-pages (Team, Blogs)
│   └── contact-form.tsx   # Validation-ready contact form
│
├── config/
│   └── data.ts            # Separated content data (Testimonials list, Alumni profiles, Team info)
│
└── public/
    └── logo.png           # CAPS Logo image
```

---

## 4. Key Components & Implementation Details

### A. Dynamic SPA Layout (`app/page.tsx`)
The page will be organized in a single scrollable stream:
1. **Hero Header:** Interactive header with logo change behavior on scroll.
2. **About CAPS:** Split view (2 columns) with description and Vision/Mission cards.
3. **Campus Network:** Interactive cards representing the 6 campuses. Clicking a card updates the active coordinates and details box.
4. **Leaflet Map:** Centers on the active campus coordinates.
5. **Services Grid:** Dynamic cards that show detail overlays on hover.
6. **Objectives List:** Styled grid with custom bullet layouts.
7. **Alumni Marquee:** Clean CSS infinite horizontal scroll ribbon.
8. **Testimonial Slider:** Draggable card carousel.
9. **Contact Form:** Traditional POST message form validation.

### B. Slide-Out Drawers (`components/slide-drawer.tsx`)
* Uses **shadcn Sheet (Drawer)** primitives.
* Displays content for sub-routes:
  * **Team Structure** (Organizational Chart + Volunteer Body lists)
  * **Creative Corner** (Blogs list, Newsletters list, Gallery grid)
* Opens dynamically if the URL matches the hash (e.g. `/#team`, `/#volunteer`, `/#gallery`).

### C. Config Content Store (`config/data.ts`)
We will export clean JSON data objects for:
* `Campuses`: Name, location, address, page link, GPS coordinates.
* `Testimonials`: VolName, Wing, Year, quote, image URL.
* `Alumni`: Name, role, company, year, image URL.

---

## 5. Verification & Testing Plan

1. **Local Server Verification:** Ensure Next.js dev server builds successfully and starts.
2. **Component Testing:**
   * Test drawer slide-in / slide-out toggles.
   * Verify Leaflet Map loads correctly without blocking the hydration process.
   * Check testimonial sliding carousel drag gestures.
3. **Responsive Checks:** Validate look and feel on mobile, tablet, and desktop viewports.
4. **SEO Verification:** Verify metadata titles and heading hierarchical structures (e.g., singular `<h1>`).
