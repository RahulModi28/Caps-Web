# CAPS Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the CAPS (Centre for Academic & Professional Support) website for Christ University as a modern, high-fidelity Single Page Application (SPA) using Next.js, Tailwind CSS, and shadcn/ui.

**Architecture:** The page is structured as a scrolling SPA. Details and secondary sections (like the full Team structure, Volunteer lists, and Blogs) slide out from the right edge as off-canvas drawers (shadcn Sheets) to keep the flow seamless. Static lists of testimonials, alumni, and campuses are stored in a modular JavaScript file to separate copy from layout.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS (v4), shadcn/ui, Leaflet.js, Framer Motion.

---

### Task 1: Next.js Initialization
**Files:**
- Create: `package.json`, `app/page.tsx`, `app/layout.tsx`, `app/globals.css` (created by CLI)

- [ ] **Step 1: Run create-next-app CLI**
  Run the Next.js setup CLI in the current directory in non-interactive mode.
  Run: `npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --yes`
  Expected: Success, core next.js files created in workspace.

- [ ] **Step 2: Initialize shadcn UI**
  Run the shadcn initialization CLI using defaults and auto-skipping prompts.
  Run: `npx -y shadcn@latest init --defaults --yes`
  Expected: Success, creates `components.json` and updates dependencies.

- [ ] **Step 3: Commit**
  Run:
  ```bash
  git add package.json package-lock.json components.json
  git commit -m "chore: initialize next.js and shadcn ui setup"
  ```

---

### Task 2: Configure Global Styles & Brand Theme
**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Set up CSS Variables in globals.css**
  Configure the official brand colors as custom properties.
  In `app/globals.css`, replace the root styles with:
  ```css
  @layer base {
    :root {
      --background: 0 0% 98%;
      --foreground: 224 71.4% 4.1%;
      
      --color-primary: 224 49% 25%;    /* Navy Blue #20315f */
      --color-accent: 38 61% 46%;      /* Gold/Ochre #bb8d2f */
      --color-dark: 231 40% 14%;       /* Dark Slate #161b33 */
      
      --card: 0 0% 100%;
      --card-foreground: 224 71.4% 4.1%;
      --popover: 0 0% 100%;
      --popover-foreground: 224 71.4% 4.1%;
      --primary: 224 49% 25%;
      --primary-foreground: 210 20% 98%;
      --secondary: 220 14.3% 95.9%;
      --secondary-foreground: 220.9 39.3% 11%;
      --muted: 220 14.3% 95.9%;
      --muted-foreground: 220 8.9% 46.1%;
      --accent: 38 61% 46%;
      --accent-foreground: 210 20% 98%;
      --destructive: 0 84.2% 60.2%;
      --destructive-foreground: 210 20% 98%;
      --border: 220 13% 91%;
      --input: 220 13% 91%;
      --ring: 224 49% 25%;
      --radius: 0.5rem;
    }
  }
  ```
  Expected: Custom Tailwind configurations match official colors.

- [ ] **Step 2: Update Page Metadata in layout.tsx**
  Add the official site titles and description to `app/layout.tsx` for SEO optimization.
  Replace `app/layout.tsx` contents with:
  ```tsx
  import type { Metadata } from "next";
  import { Inter } from "next/font/google";
  import "./globals.css";

  const inter = Inter({ subsets: ["latin"] });

  export const metadata: Metadata = {
    title: "CAPS - Centre for Academic and Professional Support",
    description: "The Centre for Academic and Professional Support (CAPS) at Christ University fosters students' holistic growth by offering training, mentoring, and support.",
  };

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en" className="scroll-smooth">
        <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
          {children}
        </body>
      </html>
    );
  }
  ```
  Expected: Clean, semantic layout config file.

- [ ] **Step 3: Commit**
  Run:
  ```bash
  git add app/globals.css app/layout.tsx
  git commit -m "style: configure global css brand variables and typography layout"
  ```

---

### Task 3: Create Content Data Store
**Files:**
- Create: `config/data.ts`

- [ ] **Step 1: Write raw content store**
  Create `config/data.ts` to hold Testimonials, Alumni, and Campus details extracted from the original website.
  Add contents:
  ```typescript
  export interface Campus {
    name: string;
    location: string;
    officeAddress: string;
    pageUrl: string;
    coordinates: [number, number];
    displayName: string;
    status: string;
  }

  export interface Alumni {
    name: string;
    role: string;
    company: string;
    year: string;
    imageUrl?: string;
  }

  export interface Testimonial {
    volunteerName: string;
    testimonial: string;
    role: string;
    wing: string;
    year: string;
    campus: string;
  }

  export const campuses: Campus[] = [
    {
      name: "Central Campus",
      location: "Bangalore",
      officeAddress: "CAPS Office, Room 910 & Room 1006, Floor 9 & 10, Central Block",
      pageUrl: "https://caps.christuniversity.in/bcc/home",
      coordinates: [12.934269, 77.605644],
      displayName: "Bangalore Central",
      status: "Publish"
    },
    {
      name: "Bannerghatta Road Campus",
      location: "Bangalore",
      officeAddress: "CAPS Office, Room 101, Floor 1, Academic Block",
      pageUrl: "https://caps.christuniversity.in/brc/home",
      coordinates: [12.877836794869678, 77.59586742924213],
      displayName: "Bangalore BRC",
      status: "Draft"
    },
    {
      name: "Kengeri Campus",
      location: "Bangalore",
      officeAddress: "CAPS Office, #79, Block 3 - 2nd Floor",
      pageUrl: "https://caps.christuniversity.in/bkc/home",
      coordinates: [12.862493226706718, 77.43879597284378],
      displayName: "Bangalore Kengeri",
      status: "Draft"
    },
    {
      name: "Yeshwanthpur Campus",
      location: "Bangalore",
      officeAddress: "CAPS Office, Room 227, Block B, Ground Floor",
      pageUrl: "https://sites.google.com/christuniversity.in/caps-site-byc/home",
      coordinates: [13.035857149631507, 77.50593103031467],
      displayName: "Bangalore BYC",
      status: "Publish"
    },
    {
      name: "Pune Lavasa",
      location: "Campus",
      officeAddress: "CHRIST Pune Lavasa Campus",
      pageUrl: "https://lavasa.christuniversity.in/center/C/CAPS2",
      coordinates: [18.411698436703016, 73.5073153346072],
      displayName: "Pune Lavasa",
      status: "Draft"
    },
    {
      name: "Delhi NCR",
      location: "Campus",
      officeAddress: "CHRIST DELHI NCR Campus",
      pageUrl: "https://caps.christuniversity.in/ncr/home",
      coordinates: [28.68366113458173, 77.41056398968146],
      displayName: "Delhi NCR",
      status: "Draft"
    }
  ];

  export const alumniList: Alumni[] = [
    { name: "Pooja Rajkumari", role: "CEWS member", company: "Benzinga", year: "2019 - 2020" },
    { name: "Piyush Ranjan", role: "Masters of Counselling", company: "Monash University", year: "2020 - 2020" },
    { name: "Shreya Kar", role: "HR Operations Intern", company: "MiQ Digital India", year: "2023 - 2025" },
    { name: "Haran RP", role: "Mentor", company: "CAPS", year: "2021 - 2022" },
    { name: "Joel Mathew Jose", role: "PhD in Psychology", company: "University", year: "2021 - 2022" },
    { name: "Kaushik Amrit Raj", role: "Analyst", company: "Marsh India Insurance Brokers", year: "2017 - 2019" },
    { name: "Prithul Chaturvedi", role: "Statistical Analyst", company: "Eli Lilly & Co.", year: "2018 - 2020" },
    { name: "Sushant Prasad", role: "Analyst", company: "Accenture", year: "2020 - 2023" }
  ];

  export const testimonialsList: Testimonial[] = [
    {
      volunteerName: "Al Sakib Hami",
      testimonial: "CAPS has been more than just a centre to me—it has been a space where I’ve grown, learned, and built meaningful connections. Being part of the Operations Committee of CAPS has given me a better understanding of the behind the scene works.",
      role: "Team Lead",
      wing: "Operations Committee",
      year: "2025 - 2026",
      campus: "Central Campus"
    },
    {
      volunteerName: "Gowri Ananth",
      testimonial: "From a curious volunteer to being spoken about as, 'There walks a Capsite', CAPS has moulded me into a confident, efficient trainer. I'm thankful to the unwavering mentorship and heartfelt support.",
      role: "Level 1 Volunteer",
      wing: "Group Peer Training",
      year: "2024 - 2025",
      campus: "Central Campus"
    },
    {
      volunteerName: "Yashica Mhatre",
      testimonial: "I’ve grown under the guidance of incredible mentors, learning from both my successes and failures. Stepping out of my comfort zone, I learned to lead with confidence and take charge of projects.",
      role: "Team Lead",
      wing: "Psychometric Assessment",
      year: "2024 - 2025",
      campus: "Central Campus"
    }
  ];
  ```
  Expected: TypeScript config compiles cleanly.

- [ ] **Step 2: Commit**
  Run:
  ```bash
  git add config/data.ts
  git commit -m "feat: add config data store with campuses, alumni, and testimonials"
  ```

---

### Task 4: Install UI Components & Utilities
**Files:**
- Create: `components/ui/button.tsx`, `components/ui/card.tsx`, `components/ui/sheet.tsx`

- [ ] **Step 1: Install shadcn UI primitives**
  Install the button, sheet, and card components.
  Run: `npx -y shadcn@latest add button card sheet`
  Expected: Creating tsx files in `components/ui/`.

- [ ] **Step 2: Install animation and icons package**
  Run: `npm install framer-motion lucide-react`
  Expected: Dependencies successfully added.

- [ ] **Step 3: Commit**
  Run:
  ```bash
  git add components/ui/
  git commit -m "chore: add shadcn button, card, and sheet components; install framer-motion and lucide-react"
  ```

---

### Task 5: Implement Header & Sidebar Navigation
**Files:**
- Create: `components/header-navigation.tsx`

- [ ] **Step 1: Create Header Component with scroll listener**
  In `components/header-navigation.tsx`, write a component containing the menu triggers and logo swaps:
  ```tsx
  "use client";

  import { useState, useEffect } from "react";
  import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
  import { Menu } from "lucide-react";

  export default function HeaderNavigation() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Services", href: "#services" },
      { name: "Campus Network", href: "#campuses" },
      { name: "Alumni", href: "#alumni" },
      { name: "Contact", href: "#contact" },
    ];

    return (
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold tracking-wider ${isScrolled ? "text-[#20315f]" : "text-white"}`}>CAPS</span>
            <div className="w-[2px] h-6 bg-[#bb8d2f]"></div>
            <span className={`text-[10px] uppercase tracking-widest max-w-[120px] leading-tight ${isScrolled ? "text-slate-600" : "text-slate-200"}`}>
              Centre for Academic Support
            </span>
          </div>

          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className={`text-sm font-medium transition-colors hover:text-[#bb8d2f] ${isScrolled ? "text-slate-700" : "text-white"}`}>
                {link.name}
              </a>
            ))}
          </nav>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className={`p-2 rounded-lg ${isScrolled ? "text-slate-800" : "text-white"}`}>
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#161b33] border-none text-white p-10">
                <nav className="flex flex-col gap-6 mt-10">
                  {navLinks.map((link) => (
                    <a key={link.name} href={link.href} className="text-lg font-medium text-slate-200 hover:text-[#bb8d2f] transition-colors">
                      {link.name}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    );
  }
  ```
  Expected: Interactive component.

- [ ] **Step 2: Commit**
  Run:
  ```bash
  git add components/header-navigation.tsx
  git commit -m "feat: implement responsive sticky header navigation with scroll-sensitive theme swap"
  ```

---

### Task 6: Implement Content Sections (Hero, About, Vision/Mission, Objectives)
**Files:**
- Create: `components/about-section.tsx`
- Create: `components/objectives-section.tsx`

- [ ] **Step 1: Create About Section Component**
  Build `components/about-section.tsx` for introduction copy and Vision/Mission grids.
  ```tsx
  export default function AboutSection() {
    return (
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#20315f] sm:text-4xl">About CAPS</h2>
            <p className="text-slate-600 leading-relaxed text-justify">
              The Centre for Academic and Professional Support (CAPS) at Christ University fosters students’ holistic growth by offering training, mentoring, peer support and co-curricular activities. It equips learners with academic, professional and life skills in a collaborative setting. As a hub for idea exchange and networking, CAPS drives research, job readiness, and leadership development.
            </p>
          </div>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl border-l-4 border-[#bb8d2f] shadow-sm">
              <h3 className="text-xl font-bold text-[#20315f] mb-2">Vision</h3>
              <p className="text-slate-600 text-sm">
                Our vision is to be a benchmark in global academic circles in providing professional and academic-based solutions to in-house as well as external patrons.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border-l-4 border-[#20315f] shadow-sm">
              <h3 className="text-xl font-bold text-[#bb8d2f] mb-2">Mission</h3>
              <p className="text-slate-600 text-sm">
                Our mission is to provide a shared platform for the entire university to exchange knowledge and experience, in order to harness expertise in the academic as well as professional spheres.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  ```
  Expected: Clean rendering.

- [ ] **Step 2: Create Objectives Section Component**
  Build `components/objectives-section.tsx` with checking layouts.
  ```tsx
  import { CheckCircle } from "lucide-react";

  export default function ObjectivesSection() {
    const objectives = [
      "To promote the spirit of volunteering through peer training and service initiatives.",
      "To create awareness on the importance of academic and professional skills for excellence in academia and workspaces.",
      "To provide support which empowers students in academic writing, research formatting, placements preparation, and presentations.",
      "To complement the existing curriculum and provide required help for the holistic growth of individuals.",
      "To provide effective channels of interaction using existing resources and sharing competencies.",
      "To transform traditional classroom learning into an interactive, personalized, 24/7 system."
    ];

    return (
      <section className="py-20 bg-[#161b33] text-white px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-3xl font-extrabold text-center text-[#bb8d2f]">Core Objectives</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {objectives.map((obj, i) => (
              <div key={i} className="flex gap-4 items-start bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <CheckCircle className="h-6 w-6 text-[#bb8d2f] shrink-0 mt-1" />
                <p className="text-slate-300 leading-relaxed text-sm">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  ```

- [ ] **Step 3: Commit**
  Run:
  ```bash
  git add components/about-section.tsx components/objectives-section.tsx
  git commit -m "feat: build About sections and Objectives component layouts"
  ```

---

### Task 7: Implement Services Grid (with hover states)
**Files:**
- Create: `components/services-grid.tsx`

- [ ] **Step 1: Create Services Grid Component**
  Build `components/services-grid.tsx` detailing the 5 services.
  ```tsx
  export default function ServicesGrid() {
    const services = [
      {
        title: "One-on-one Peer Training",
        subtitle: "Writing Centre",
        desc: "Get personalized guidance for all your writing needs—academic or professional—from trained peer trainers."
      },
      {
        title: "Group Peer Training",
        subtitle: "Classroom Sessions",
        desc: "Be a part of dynamic classroom sessions to boost your academic skills and unlock your professional potential."
      },
      {
        title: "Industry Connect",
        subtitle: "Market Studies",
        desc: "Be a part of wing hosts events, creates a platform for essential industry interaction and conducts market studies."
      },
      {
        title: "Communication Lab",
        subtitle: "Online Learning",
        desc: "Prefer to learn at your own pace? Explore flexible online modules, micro-credential courses, and workshops."
      },
      {
        title: "Psychometric Assessments",
        subtitle: "Self-Awareness",
        desc: "Get personalized psychometric assessments to enhance self-awareness and make smarter choices."
      }
    ];

    return (
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto space-y-12">
        <h2 className="text-3xl font-extrabold text-center text-[#20315f]">Services We Provide</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group relative h-64 rounded-2xl overflow-hidden shadow-md bg-[#20315f] text-white flex flex-col justify-end p-6 border-b-4 border-[#bb8d2f]">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10"></div>
              <div className="relative z-20 space-y-2 transition-transform duration-300 group-hover:-translate-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#bb8d2f] font-bold">{service.subtitle}</span>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="text-slate-300 text-xs leading-relaxed opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-24 transition-all duration-500">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  ```
  Expected: Hover reveal effect works.

- [ ] **Step 2: Commit**
  Run:
  ```bash
  git add components/services-grid.tsx
  git commit -m "feat: implement services grid with dynamic hover expansion content overlay"
  ```

---

### Task 8: Implement Campus Locations Grid & Interactive Map
**Files:**
- Create: `components/campus-network.tsx`

- [ ] **Step 1: Install map dependency**
  Run: `npm install leaflet @types/leaflet`
  Expected: Added correctly.

- [ ] **Step 2: Create Leaflet Campus Map Component**
  Create `components/campus-network.tsx` handling SSR checks and rendering markers on campus coordinates.
  ```tsx
  "use client";

  import { useState, useEffect } from "react";
  import { campuses, Campus } from "@/config/data";
  import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
  import "leaflet/dist/leaflet.css";
  import L from "leaflet";

  // Fix Leaflet missing icon marker issues
  const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
      map.setView(center, 15);
    }, [center, map]);
    return null;
  }

  export default function CampusNetwork() {
    const [mounted, setMounted] = useState(false);
    const [activeCampus, setActiveCampus] = useState<Campus>(campuses[0]);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) return <div className="h-96 w-full bg-slate-100 flex items-center justify-center">Loading map...</div>;

    return (
      <section id="campuses" className="py-24 bg-slate-50 px-6 max-w-7xl mx-auto space-y-12">
        <h2 className="text-3xl font-extrabold text-center text-[#20315f]">Campus Network</h2>
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="space-y-6">
            <label className="block text-sm font-semibold text-slate-700">Select Campus</label>
            <select
              className="w-full p-3 bg-white border border-slate-300 rounded-xl shadow-sm focus:ring-[#20315f] focus:border-[#20315f]"
              value={activeCampus.name}
              onChange={(e) => {
                const selected = campuses.find(c => c.name === e.target.value);
                if (selected) setActiveCampus(selected);
              }}
            >
              {campuses.map((c) => (
                <option key={c.name} value={c.name}>{c.displayName}</option>
              ))}
            </select>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-[#20315f]">{activeCampus.name}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                <strong>Office Address:</strong><br />
                {activeCampus.officeAddress}
              </p>
              <a href={activeCampus.pageUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#20315f] hover:bg-[#bb8d2f] text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Go to Campus Portal
              </a>
            </div>
          </div>

          <div className="h-96 rounded-2xl overflow-hidden shadow-lg border border-slate-300 z-10">
            <MapContainer center={activeCampus.coordinates} zoom={15} className="h-full w-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <ChangeView center={activeCampus.coordinates} />
              {campuses.map((c) => (
                <Marker key={c.name} position={c.coordinates}>
                  <Popup>
                    <div className="text-center font-sans">
                      <strong className="text-[#20315f]">{c.displayName}</strong>
                      <p className="text-xs text-slate-600 mt-1">{c.officeAddress}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </section>
    );
  }
  ```

- [ ] **Step 3: Commit**
  Run:
  ```bash
  git add components/campus-network.tsx
  git commit -m "feat: build campus locations network view alongside leaflet coordinate map centering wrapper"
  ```

---

### Task 9: Implement Alumni Marquee & Testimonials Slider
**Files:**
- Create: `components/alumni-marquee.tsx`
- Create: `components/testimonial-slider.tsx`

- [ ] **Step 1: Create Alumni Marquee component**
  Write infinite marquee inside `components/alumni-marquee.tsx` using CSS keyframes.
  ```tsx
  import { alumniList } from "@/config/data";

  export default function AlumniMarquee() {
    return (
      <section id="alumni" className="py-20 bg-slate-100 overflow-hidden space-y-8">
        <h2 className="text-3xl font-extrabold text-center text-[#20315f]">Our Alumni Network</h2>
        <div className="relative w-full flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex gap-6">
            {alumniList.concat(alumniList).map((alumni, i) => (
              <div key={i} className="inline-flex min-w-[320px] bg-white border border-slate-200 p-4 rounded-2xl items-center gap-4 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-[#20315f] flex items-center justify-center text-white font-bold shrink-0">
                  {alumni.name[0]}
                </div>
                <div className="text-left leading-normal">
                  <h4 className="font-bold text-slate-800 text-sm">{alumni.name}</h4>
                  <p className="text-xs text-[#bb8d2f] font-semibold">{alumni.role} @ {alumni.company}</p>
                  <p className="text-[10px] text-slate-500">{alumni.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  ```
  Expected: Smooth scrolling ribbon animation works. We must add `@keyframes marquee` to `app/globals.css` in Step 3.

- [ ] **Step 2: Create Testimonial Slider component**
  Build `components/testimonial-slider.tsx` rendering card slides.
  ```tsx
  "use client";

  import { useState } from "react";
  import { testimonialsList } from "@/config/data";
  import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

  export default function TestimonialSlider() {
    const [index, setIndex] = useState(0);

    const handlePrev = () => {
      setIndex((prev) => (prev === 0 ? testimonialsList.length - 1 : prev - 1));
    };

    const handleNext = () => {
      setIndex((prev) => (prev === testimonialsList.length - 1 ? 0 : prev + 1));
    };

    const active = testimonialsList[index];

    return (
      <section className="py-24 px-6 max-w-4xl mx-auto space-y-12">
        <h2 className="text-3xl font-extrabold text-center text-[#20315f]">Volunteer Testimonials</h2>
        <div className="relative bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm space-y-6">
          <Quote className="h-12 w-12 text-[#bb8d2f]/20 absolute top-6 left-6" />
          <p className="text-slate-600 italic text-center text-base md:text-lg leading-relaxed relative z-10">
            "{active.testimonial}"
          </p>
          <div className="text-center">
            <h4 className="font-extrabold text-[#20315f] text-lg">{active.volunteerName}</h4>
            <p className="text-[#bb8d2f] text-xs font-bold uppercase tracking-wider mt-1">{active.role}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{active.wing} | {active.campus} {active.year}</p>
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={handlePrev} className="p-2 border border-slate-300 rounded-full hover:bg-slate-50 transition-colors">
              <ChevronLeft className="h-5 w-5 text-slate-700" />
            </button>
            <button onClick={handleNext} className="p-2 border border-slate-300 rounded-full hover:bg-slate-50 transition-colors">
              <ChevronRight className="h-5 w-5 text-slate-700" />
            </button>
          </div>
        </div>
      </section>
    );
  }
  ```

- [ ] **Step 3: Add marquee CSS in globals.css**
  Append marquee keyframe animation to `app/globals.css`:
  ```css
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 25s linear infinite;
  }
  ```

- [ ] **Step 4: Commit**
  Run:
  ```bash
  git add components/alumni-marquee.tsx components/testimonial-slider.tsx app/globals.css
  git commit -m "feat: construct Alumni marquee animation and Testimonial slider switcher"
  ```

---

### Task 10: Implement Contact Form & API Route
**Files:**
- Create: `components/contact-form.tsx`
- Create: `app/api/contact/route.ts`

- [ ] **Step 1: Create Contact Form Component**
  Build `components/contact-form.tsx` with basic state validation and dynamic POST fetch actions.
  ```tsx
  "use client";

  import { useState } from "react";

  export default function ContactForm() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.name || !form.email || !form.message) return;
      setStatus("sending");
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        if (res.ok) {
          setStatus("success");
          setForm({ name: "", email: "", message: "" });
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
    };

    return (
      <section id="contact" className="py-24 bg-slate-900 text-white px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-extrabold text-center text-[#bb8d2f]">Contact Us</h2>
          {status === "success" ? (
            <div className="text-center p-6 bg-slate-800 border border-slate-700 rounded-2xl">
              <h3 className="text-xl font-bold text-emerald-400">Message Sent!</h3>
              <p className="text-slate-400 text-sm mt-2">Thank you. We will get back to you within 24-48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 block w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:ring-[#bb8d2f] focus:border-[#bb8d2f]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 block w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:ring-[#bb8d2f] focus:border-[#bb8d2f]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1 block w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:ring-[#bb8d2f] focus:border-[#bb8d2f]"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-[#bb8d2f] hover:bg-[#bb8d2f]/80 disabled:bg-slate-800 text-white font-bold p-3 rounded-xl transition-colors"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>
    );
  }
  ```

- [ ] **Step 2: Create endpoint handler**
  Build `/app/api/contact/route.ts` parsing contact requests.
  ```typescript
  import { NextResponse } from "next/server";

  export async function POST(request: Request) {
    try {
      const body = await request.json();
      console.log("Contact form submission received:", body);
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
  }
  ```

- [ ] **Step 3: Commit**
  Run:
  ```bash
  git add components/contact-form.tsx app/api/contact/route.ts
  git commit -m "feat: install contact routing and component inputs handler"
  ```

---

### Task 11: Main View Assembly & Dynamic Drawers
**Files:**
- Modify: `app/page.tsx`
- Create: `components/footer.tsx`

- [ ] **Step 1: Create Footer component**
  Build `components/footer.tsx` representing brand elements and standard address structures.
  ```tsx
  export default function Footer() {
    return (
      <footer className="bg-slate-950 text-white py-12 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#bb8d2f]">CAPS</h4>
            <p className="text-slate-400 leading-relaxed">
              Centre for Academic and Professional Support.<br />
              CHRIST (Deemed to be University), Bangalore - 560029
            </p>
          </div>
          <div>
            <h4 className="text-md font-bold mb-4">Quick Contact</h4>
            <p className="text-slate-400 space-y-1">
              Email: caps@christuniversity.in<br />
              Phone: +91 80 4012 9728 / 9678
            </p>
          </div>
          <div>
            <h4 className="text-md font-bold mb-4">Office Hours</h4>
            <p className="text-slate-400">
              Monday - Friday: 9:00 AM - 5:00 PM<br />
              Saturday: 9:00 AM - 1:00 PM
            </p>
          </div>
        </div>
      </footer>
    );
  }
  ```

- [ ] **Step 2: Assemble sections in main page.tsx**
  Assemble components in order inside `app/page.tsx`:
  ```tsx
  import HeaderNavigation from "@/components/header-navigation";
  import AboutSection from "@/components/about-section";
  import ObjectivesSection from "@/components/objectives-section";
  import ServicesGrid from "@/components/services-grid";
  import CampusNetwork from "@/components/campus-network";
  import AlumniMarquee from "@/components/alumni-marquee";
  import TestimonialSlider from "@/components/testimonial-slider";
  import ContactForm from "@/components/contact-form";
  import Footer from "@/components/footer";

  export default function Home() {
    return (
      <main id="home" className="relative min-h-screen overflow-x-hidden">
        <HeaderNavigation />
        
        {/* Hero Section */}
        <section className="relative h-screen bg-[#20315f] flex flex-col justify-center items-center px-6 text-center text-white">
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Centre for Academic & <br />
              <span className="text-[#bb8d2f]">Professional Support</span>
            </h1>
            <p className="text-slate-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Equipping learners with essential academic, professional, and life skills to succeed in global spaces.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="#services" className="bg-[#bb8d2f] hover:bg-[#bb8d2f]/80 text-white font-bold px-6 py-3 rounded-xl transition-all">
                Explore Services
              </a>
              <a href="#contact" className="border border-white hover:bg-white/10 text-white font-bold px-6 py-3 rounded-xl transition-all">
                Get In Touch
              </a>
            </div>
          </div>
        </section>

        <AboutSection />
        <ObjectivesSection />
        <ServicesGrid />
        <CampusNetwork />
        <AlumniMarquee />
        <TestimonialSlider />
        <ContactForm />
        <Footer />
      </main>
    );
  }
  ```

- [ ] **Step 3: Commit**
  Run:
  ```bash
  git add app/page.tsx components/footer.tsx
  git commit -m "feat: assemble core page widgets stream inside main app layout page"
  ```

---

### Task 12: Build & Verification Checks
**Files:**
- Create: None (Verification only)

- [ ] **Step 1: Run production build compilation**
  Verify Next.js builds clean without warning or error triggers.
  Run: `npm run build`
  Expected: Success, generates static output logs under `.next`.

- [ ] **Step 2: Commit**
  Run:
  ```bash
  git add -A
  git commit -m "chore: successfully verify production static build compilation check"
  ```
