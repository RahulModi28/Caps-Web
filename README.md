# CAPS Website — Christ University Yeshwanthpur

The official website for the **Centre for Academic and Professional Support (CAPS)** at Christ University, Yeshwanthpur Campus. Built with **Next.js 16** (App Router) and powered by Webflow-exported HTML/CSS assets.

---

## 🚀 Getting Started

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

---

## 📁 Project Structure

```
CAPS WEB/
├── app/                          # Next.js App Router pages
│   ├── about/
│   │   └── leadership-governance/
│   │       └── page.tsx          # /about/leadership-governance route
│   ├── api/
│   │   └── contact/              # Contact form API endpoint
│   ├── caps-body.html            # HTML body content for the Home page
│   ├── leadership-body.html      # HTML body content for the Leadership page
│   ├── globals.css               # Global CSS (Next.js base styles)
│   ├── layout.tsx                # Root layout — shared <head>, scripts, metadata
│   └── page.tsx                  # Home page (/)
│
├── components/                   # Shared React components (future use)
│   └── ui/
│
├── config/
│   └── data.ts                   # Shared data / configuration constants
│
├── public/                       # Static assets served at root (/)
│   ├── css/
│   │   ├── caps-shared.css       # Shared styles across all pages
│   │   ├── caps-layout.css       # Layout styles for the Home page
│   │   ├── leadership-specific.css  # Styles specific to Leadership page
│   │   └── swiper-bundle.min.css # Swiper carousel styles
│   ├── js/
│   │   ├── caps-entry.js         # Entry script (runs before DOM is ready)
│   │   ├── caps-interactions.js  # Webflow interaction/animation scripts
│   │   ├── global.js             # Global utility functions
│   │   ├── gsap.min.js           # GSAP animation library
│   │   ├── ScrollTrigger.min.js  # GSAP ScrollTrigger plugin
│   │   ├── SplitText.min.js      # GSAP SplitText plugin
│   │   ├── jquery-3.5.1.min.js   # jQuery (required by Webflow interactions)
│   │   └── swiper-bundle.min.js  # Swiper carousel library
│   ├── fonts/                    # Locally hosted web fonts
│   ├── logo.png                  # CAPS logo (light background)
│   └── logo-dark.png             # CAPS logo (dark background)
│
├── design-system/                # Design tokens and style references
├── docs/                         # Internal documentation
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json
```

---

## 📝 How Pages Work

This project uses a **hybrid rendering pattern**: Next.js handles routing and the shared `<head>`, while the actual page content is stored as standalone HTML files (`*-body.html`) and injected at render time via `dangerouslySetInnerHTML`.

### Page Architecture

```
app/layout.tsx
  ↓ (wraps every page with shared <head>, scripts, metadata)
app/page.tsx   or   app/about/leadership-governance/page.tsx
  ↓ (reads the corresponding *-body.html file)
app/caps-body.html   or   app/leadership-body.html
  ↓ (the actual HTML markup, Prettier-formatted for readability)
```

---

## ➕ Adding a New Page

Follow these steps to add a new page (e.g., `/events`):

### 1. Create the body HTML file

Create `app/events-body.html` with the page content. Make sure:
- No `<html>`, `<head>`, `<body>` wrapper tags (content only)
- Starts with `<div class="page-wrapper">` following the existing pattern
- All HTML is properly formatted (run Prettier after editing)

### 2. Create the Next.js page

Create `app/events/page.tsx`:

```tsx
import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | CAPS Christ University",
  description: "Upcoming events organised by CAPS at Christ University.",
};

export default function EventsPage() {
  const filePath = path.join(process.cwd(), "app/events-body.html");
  const htmlContent = fs.readFileSync(filePath, "utf8");

  return (
    <>
      {/* Add page-specific stylesheet if needed */}
      <link href="/css/events-specific.css" rel="stylesheet" type="text/css" />
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        suppressHydrationWarning
      />
    </>
  );
}
```

### 3. Add a page-specific stylesheet (if needed)

Place the CSS file at `public/css/events-specific.css`.

### 4. Format the HTML

```bash
npx prettier --write "app/events-body.html"
```

### 5. Verify the build

```bash
npm run build
```

---

## 🎨 CSS Architecture

| File | Scope |
|------|-------|
| `public/css/caps-shared.css` | Global styles — variables, resets, nav, footer |
| `public/css/caps-layout.css` | Home page specific layout |
| `public/css/leadership-specific.css` | Leadership & Governance page specific |
| `app/globals.css` | Next.js base styles (minimal) |

When adding a new page, import `caps-shared.css` for the shared nav/footer styles, then create a page-specific CSS file for page-level styles.

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 16.x | Framework & routing |
| React | 19.x | UI rendering |
| TypeScript | 5.x | Type safety |
| GSAP | 3.x | Animations & scroll effects |
| Swiper | — | Carousels & sliders |
| jQuery | 3.5.1 | Webflow interaction dependency |
| Prettier | — | Code formatting |

---

## ✅ Code Quality

Run Prettier to format all source files:

```bash
npx prettier --write "app/**/*.tsx" "app/**/*.html" "app/**/*.css"
```
