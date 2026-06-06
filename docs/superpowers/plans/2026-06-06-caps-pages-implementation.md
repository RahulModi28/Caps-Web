# CAPS Website Menu Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and integrate all 15 remaining pages from the navigation menu (Wings, Committees, Learn, and Resources) into the CAPS portal using a modular, dynamic HTML assembler.

**Architecture:** 
1. Extract `app/header.html` and `app/footer.html` from `app/caps-body.html`.
2. Extract the homepage content into `app/home-body.html` and the leadership page content into `app/about/leadership-governance/body.html`.
3. Create a unified HTML assembler utility (`lib/html-assembler.ts`) that reads the header, footer, and body files, dynamically inserts active CSS classes (like Webflow's `w--current`), and serves pages.
4. Establish dynamic Next.js routes with `generateStaticParams()` for compile-time rendering of all subpages.
5. Create page-specific HTML body content files matching the spec.

**Tech Stack:** Next.js 16 (Pages/App router layout structure), Node.js `fs` file handling, Git for version control.

---

## File Mapping

### New Files
* `lib/html-assembler.ts` - Shared HTML compilation engine
* `app/header.html` - Extraction of navigation elements
* `app/footer.html` - Extraction of footer and script references
* `app/home-body.html` - Extract of homepage-specific sections
* `app/about/leadership-governance/body.html` - Extract of leadership-specific sections
* `app/wings/[wing]/page.tsx` - Dynamic routing sheet for Wings
* `app/committees/[committee]/page.tsx` - Dynamic routing sheet for Committees
* `app/learn/[page]/page.tsx` - Dynamic routing sheet for Learn
* `app/resources/[page]/page.tsx` - Dynamic routing sheet for Resources
* `app/wings/content/one-on-one-peer-training.html` - One on One page content
* `app/wings/content/group-peer-training.html` - Group Peer Training page content
* `app/wings/content/connect-wide.html` - Connect Wide page content
* `app/wings/content/research-assessment.html` - Research & Assessment page content
* `app/committees/content/media-pr.html` - Media & PR page content
* `app/committees/content/learning-development.html` - L&D page content
* `app/committees/content/operations-analytics.html` - Operations page content
* `app/committees/content/tech-tank.html` - Tech Tank page content
* `app/learn/content/peer-mentoring.html` - Peer Mentoring page content
* `app/learn/content/self-guided-modules.html` - Self-Guided Modules page content
* `app/learn/content/workshop-schedules.html` - Workshop Schedules page content
* `app/learn/content/volunteer-registration.html` - Volunteer Registration page content
* `app/resources/content/faqs.html` - FAQs page content
* `app/resources/content/session-guidelines.html` - Session Guidelines page content
* `app/resources/content/writing-handbooks.html` - Writing Handbooks page content
* `app/resources/content/reference-materials.html` - Reference Materials page content

### Modified Files
* `app/page.tsx` - Update to use dynamic assembler
* `app/about/leadership-governance/page.tsx` - Update to use dynamic assembler

---

## Tasks Checklist

### Task 1: Extract Base Layout Layout Templates

**Files:**
* Create: `app/header.html`
* Create: `app/footer.html`
* Create: `app/home-body.html`
* Create: `app/about/leadership-governance/body.html`

- [ ] **Step 1: Write helper script to extract layout templates**
  Create a temporary script `scratch/extract-layouts.mjs` to split the files at exact line boundaries.

  ```javascript
  import fs from 'fs';
  import path from 'path';

  const capsBodyPath = path.join(process.cwd(), 'app/caps-body.html');
  const capsContent = fs.readFileSync(capsBodyPath, 'utf8');
  const lines = capsContent.split('\n');

  // Header: lines 1 to 2608 (1-indexed)
  const headerHtml = lines.slice(0, 2608).join('\n');
  // Home Body: lines 2609 to 4389 (1-indexed)
  const homeBodyHtml = lines.slice(2608, 4389).join('\n');
  // Footer: lines 4390 to the end (1-indexed)
  const footerHtml = lines.slice(4389).join('\n');

  fs.writeFileSync(path.join(process.cwd(), 'app/header.html'), headerHtml);
  fs.writeFileSync(path.join(process.cwd(), 'app/home-body.html'), homeBodyHtml);
  fs.writeFileSync(path.join(process.cwd(), 'app/footer.html'), footerHtml);

  // Extract Leadership body content
  const leadBodyPath = path.join(process.cwd(), 'app/leadership-body.html');
  const leadContent = fs.readFileSync(leadBodyPath, 'utf8');
  const leadLines = leadContent.split('\n');
  // Leadership Body Content: lines 2534 to 4373
  const leadBodyHtml = leadLines.slice(2533, 4373).join('\n');
  fs.mkdirSync(path.join(process.cwd(), 'app/about/leadership-governance'), { recursive: true });
  fs.writeFileSync(path.join(process.cwd(), 'app/about/leadership-governance/body.html'), leadBodyHtml);

  console.log('Layout components successfully extracted!');
  ```

- [ ] **Step 2: Run the extraction script**
  Run: `node scratch/extract-layouts.mjs`
  Expected: Successful file generation and console confirmation.

- [ ] **Step 3: Verify extracted template sizes**
  Run: `ls -lh app/header.html app/footer.html app/home-body.html`
  Expected: All files are populated and reflect appropriate byte sizes.

- [ ] **Step 4: Commit templates**
  Run: `git add app/header.html app/footer.html app/home-body.html app/about/leadership-governance/body.html`
  Run: `git commit -m "feat: extract HTML layout templates and body components"`

---

### Task 2: Build HTML Assembler Engine

**Files:**
* Create: `lib/html-assembler.ts`

- [ ] **Step 1: Write HTML assembler utility**
  Create `lib/html-assembler.ts` containing file loading, path matching, and active link replacement.

  ```typescript
  import fs from 'fs';
  import path from 'path';

  export function assemblePage(bodyContentHtml: string, currentRoute: string): string {
    const headerPath = path.join(process.cwd(), 'app/header.html');
    const footerPath = path.join(process.cwd(), 'app/footer.html');

    let header = fs.readFileSync(headerPath, 'utf8');
    const footer = fs.readFileSync(footerPath, 'utf8');

    // 1. Add active class w--current to the navigation link
    // Replace the specific href link to append class="w--current"
    const escapedRoute = currentRoute.replace(/\//g, '\\/');
    const linkRegex = new RegExp(`(href="${currentRoute}"\\s+class="[^"]*)(")`, 'g');
    header = header.replace(linkRegex, `$1 w--current$2`);

    // 2. Remove default w--current on root link if not on homepage
    if (currentRoute !== '/') {
      header = header.replace('class="logo_component w-inline-block w--current"', 'class="logo_component w-inline-block"');
      header = header.replace('class="nav-menu_link-group-tab_link w-inline-block w--current"', 'class="nav-menu_link-group-tab_link w-inline-block"');
    }

    return `${header}\n${bodyContentHtml}\n${footer}`;
  }

  export function loadBodyContent(relativeFilePath: string): string {
    const fullPath = path.join(process.cwd(), relativeFilePath);
    return fs.readFileSync(fullPath, 'utf8');
  }
  ```

- [ ] **Step 2: Update homepage page.tsx to use assembler**
  Modify `app/page.tsx` to use `assemblePage` instead of raw body file imports.

  ```typescript
  import { assemblePage, loadBodyContent } from "@/lib/html-assembler";

  export default function Home() {
    const homeBody = loadBodyContent("app/home-body.html");
    const assembledHtml = assemblePage(homeBody, "/");

    return (
      <div
        dangerouslySetInnerHTML={{ __html: assembledHtml }}
        suppressHydrationWarning
      />
    );
  }
  ```

- [ ] **Step 3: Update leadership page.tsx to use assembler**
  Modify `app/about/leadership-governance/page.tsx` to use the dynamic layout.

  ```typescript
  import type { Metadata } from "next";
  import { assemblePage, loadBodyContent } from "@/lib/html-assembler";

  export const metadata: Metadata = {
    title: "Leadership & Governance | CAPS Christ University",
    description: "Meet the CAPS leadership team of experienced student coordinators, team leads and teacher mentors.",
  };

  export default function LeadershipGovernancePage() {
    const bodyContent = loadBodyContent("app/about/leadership-governance/body.html");
    const assembledHtml = assemblePage(bodyContent, "/about/leadership-governance");

    return (
      <>
        <link
          href="/css/leadership-specific.css"
          rel="stylesheet"
          type="text/css"
        />
        <div
          dangerouslySetInnerHTML={{ __html: assembledHtml }}
          suppressHydrationWarning
        />
      </>
    );
  }
  ```

- [ ] **Step 4: Verify local dev build compilation**
  Run: `npm run build`
  Expected: Successful Next.js static compilation without errors.

- [ ] **Step 5: Commit assembler**
  Run: `git add lib/html-assembler.ts app/page.tsx app/about/leadership-governance/page.tsx`
  Run: `git commit -m "feat: integrate dynamic HTML assembler engine"`

---

### Task 3: Implement Dynamic Routes & static params

**Files:**
* Create: `app/wings/[wing]/page.tsx`
* Create: `app/committees/[committee]/page.tsx`
* Create: `app/learn/[page]/page.tsx`
* Create: `app/resources/[page]/page.tsx`

- [ ] **Step 1: Write Wings route page**
  Create `app/wings/[wing]/page.tsx` using `generateStaticParams()` to support static paths.

  ```typescript
  import { notFound } from "next/navigation";
  import type { Metadata } from "next";
  import { assemblePage, loadBodyContent } from "@/lib/html-assembler";

  interface Props {
    params: Promise<{ wing: string }>;
  }

  const wingMap: Record<string, { title: string; file: string }> = {
    "one-on-one-peer-training": {
      title: "One on One Peer Training | CAPS",
      file: "app/wings/content/one-on-one-peer-training.html",
    },
    "group-peer-training": {
      title: "Group Peer Training | CAPS",
      file: "app/wings/content/group-peer-training.html",
    },
    "connect-wide": {
      title: "Connect Wide | CAPS",
      file: "app/wings/content/connect-wide.html",
    },
    "research-assessment": {
      title: "Research & Assessment | CAPS",
      file: "app/wings/content/research-assessment.html",
    },
  };

  export async function generateStaticParams() {
    return Object.keys(wingMap).map((wing) => ({ wing }));
  }

  export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { wing } = await params;
    const config = wingMap[wing];
    if (!config) return {};
    return {
      title: config.title,
      description: `Explore ${config.title} services and offerings at CAPS Christ University Yeshwanthpur Campus.`,
    };
  }

  export default async function WingPage({ params }: Props) {
    const { wing } = await params;
    const config = wingMap[wing];
    if (!config) notFound();

    const bodyContent = loadBodyContent(config.file);
    const assembledHtml = assemblePage(bodyContent, `/wings/${wing}`);

    return (
      <div
        dangerouslySetInnerHTML={{ __html: assembledHtml }}
        suppressHydrationWarning
      />
    );
  }
  ```

- [ ] **Step 2: Write Committees route page**
  Create `app/committees/[committee]/page.tsx` following the same dynamic pattern.

  ```typescript
  import { notFound } from "next/navigation";
  import type { Metadata } from "next";
  import { assemblePage, loadBodyContent } from "@/lib/html-assembler";

  interface Props {
    params: Promise<{ committee: string }>;
  }

  const committeeMap: Record<string, { title: string; file: string }> = {
    "media-pr": {
      title: "Media & PR Committee | CAPS",
      file: "app/committees/content/media-pr.html",
    },
    "learning-development": {
      title: "Learning & Development Committee | CAPS",
      file: "app/committees/content/learning-development.html",
    },
    "operations-analytics": {
      title: "Operations & Analytics Committee | CAPS",
      file: "app/committees/content/operations-analytics.html",
    },
    "tech-tank": {
      title: "Tech Tank Committee | CAPS",
      file: "app/committees/content/tech-tank.html",
    },
  };

  export async function generateStaticParams() {
    return Object.keys(committeeMap).map((committee) => ({ committee }));
  }

  export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { committee } = await params;
    const config = committeeMap[committee];
    if (!config) return {};
    return {
      title: config.title,
      description: `Learn more about the ${config.title} deliverables, members, and recruitment at CAPS.`,
    };
  }

  export default async function CommitteePage({ params }: Props) {
    const { committee } = await params;
    const config = committeeMap[committee];
    if (!config) notFound();

    const bodyContent = loadBodyContent(config.file);
    const assembledHtml = assemblePage(bodyContent, `/committees/${committee}`);

    return (
      <div
        dangerouslySetInnerHTML={{ __html: assembledHtml }}
        suppressHydrationWarning
      />
    );
  }
  ```

- [ ] **Step 3: Write Learn route page**
  Create `app/learn/[page]/page.tsx`.

  ```typescript
  import { notFound } from "next/navigation";
  import type { Metadata } from "next";
  import { assemblePage, loadBodyContent } from "@/lib/html-assembler";

  interface Props {
    params: Promise<{ page: string }>;
  }

  const learnMap: Record<string, { title: string; file: string }> = {
    "peer-mentoring": {
      title: "Peer Mentoring Program | CAPS",
      file: "app/learn/content/peer-mentoring.html",
    },
    "self-guided-modules": {
      title: "Self-Guided Modules | CAPS",
      file: "app/learn/content/self-guided-modules.html",
    },
    "workshop-schedules": {
      title: "Workshop Schedules & Events | CAPS",
      file: "app/learn/content/workshop-schedules.html",
    },
    "volunteer-registration": {
      title: "Volunteer Registration | CAPS",
      file: "app/learn/content/volunteer-registration.html",
    },
  };

  export async function generateStaticParams() {
    return Object.keys(learnMap).map((page) => ({ page }));
  }

  export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { page } = await params;
    const config = learnMap[page];
    if (!config) return {};
    return {
      title: config.title,
      description: `Access academic support materials and listings for ${config.title} at CAPS.`,
    };
  }

  export default async function LearnPage({ params }: Props) {
    const { page } = await params;
    const config = learnMap[page];
    if (!config) notFound();

    const bodyContent = loadBodyContent(config.file);
    const assembledHtml = assemblePage(bodyContent, `/learn/${page}`);

    return (
      <div
        dangerouslySetInnerHTML={{ __html: assembledHtml }}
        suppressHydrationWarning
      />
    );
  }
  ```

- [ ] **Step 4: Write Resources route page**
  Create `app/resources/[page]/page.tsx`.

  ```typescript
  import { notFound } from "next/navigation";
  import type { Metadata } from "next";
  import { assemblePage, loadBodyContent } from "@/lib/html-assembler";

  interface Props {
    params: Promise<{ page: string }>;
  }

  const resourceMap: Record<string, { title: string; file: string }> = {
    "faqs": {
      title: "Frequently Asked Questions | CAPS",
      file: "app/resources/content/faqs.html",
    },
    "session-guidelines": {
      title: "Session Guidelines & Code of Conduct | CAPS",
      file: "app/resources/content/session-guidelines.html",
    },
    "writing-handbooks": {
      title: "Academic Writing Handbooks | CAPS",
      file: "app/resources/content/writing-handbooks.html",
    },
    "reference-materials": {
      title: "Academic Reference Materials | CAPS",
      file: "app/resources/content/reference-materials.html",
    },
  };

  export async function generateStaticParams() {
    return Object.keys(resourceMap).map((page) => ({ page }));
  }

  export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { page } = await params;
    const config = resourceMap[page];
    if (!config) return {};
    return {
      title: config.title,
      description: `Download academic resources, writing handbooks, and view ${config.title} details.`,
    };
  }

  export default async function ResourcePage({ params }: Props) {
    const { page } = await params;
    const config = resourceMap[page];
    if (!config) notFound();

    const bodyContent = loadBodyContent(config.file);
    const assembledHtml = assemblePage(bodyContent, `/resources/${page}`);

    return (
      <div
        dangerouslySetInnerHTML={{ __html: assembledHtml }}
        suppressHydrationWarning
      />
    );
  }
  ```

- [ ] **Step 5: Verify route structures**
  Run: `npm run build`
  Expected: Successful compilation confirming Next.js recognizes the dynamic parameter types.

- [ ] **Step 6: Commit dynamic route pages**
  Run: `git add app/wings/` `git add app/committees/` `git add app/learn/` `git add app/resources/`
  Run: `git commit -m "feat: add Next.js dynamic routing configurations"`

---

### Task 4: Author Page Body HTML Contents

**Files:**
* Create: 15 HTML content files under the folders `app/wings/content/`, `app/committees/content/`, `app/learn/content/`, and `app/resources/content/`.

- [ ] **Step 1: Write HTML contents for the Wings pages**
  Write:
  * `app/wings/content/one-on-one-peer-training.html`
  * `app/wings/content/group-peer-training.html`
  * `app/wings/content/connect-wide.html`
  * `app/wings/content/research-assessment.html`
  *(Details from Section 3.1 of the design spec)*

- [ ] **Step 2: Write HTML contents for the Committees pages**
  Write:
  * `app/committees/content/media-pr.html`
  * `app/committees/content/learning-development.html`
  * `app/committees/content/operations-analytics.html`
  * `app/committees/content/tech-tank.html`
  *(Details from Section 3.2 of the design spec)*

- [ ] **Step 3: Write HTML contents for the Learn pages**
  Write:
  * `app/learn/content/peer-mentoring.html`
  * `app/learn/content/self-guided-modules.html`
  * `app/learn/content/workshop-schedules.html`
  * `app/learn/content/volunteer-registration.html`
  *(Details from Section 3.3 of the design spec)*

- [ ] **Step 4: Write HTML contents for the Resources pages**
  Write:
  * `app/resources/content/faqs.html`
  * `app/resources/content/session-guidelines.html`
  * `app/resources/content/writing-handbooks.html`
  * `app/resources/content/reference-materials.html`
  *(Details from Section 3.4 of the design spec)*

- [ ] **Step 5: Verify build with mock pages**
  Run: `npm run build`
  Expected: Successful compilation, showing all dynamic content HTML files are loaded at build time.

- [ ] **Step 6: Commit page content files**
  Run: `git add app/wings/content/ app/committees/content/ app/learn/content/ app/resources/content/`
  Run: `git commit -m "feat: write HTML contents for all menu pages"`

---

### Task 5: Link Menu Navigation & Final Review

**Files:**
* Modify: `app/header.html`
* Modify: `app/home-body.html`
* Modify: `app/about/leadership-governance/body.html`

- [ ] **Step 1: Update navigation links in header.html**
  Replace all `#` and placeholder links in `app/header.html` with their corresponding subpage routes (e.g. `href="/wings/one-on-one-peer-training"`, `href="/committees/media-pr"`, etc.).

- [ ] **Step 2: Update footer navigation links in footer.html**
  Replace all footer menu quicklinks inside `app/footer.html` with their new relative paths.

- [ ] **Step 3: Compile and build final bundle**
  Run: `npm run build`
  Expected: Static HTML generation complete for all 15 routes, zero TypeScript/Webpack compilation errors.

- [ ] **Step 4: Verify route visual layouts**
  Use the `/browser` dev companion to navigate through the new routes locally on `http://localhost:3000/`. Confirm that the header links load correctly, navigation drawers open, and layout styles are applied.

- [ ] **Step 5: Commit updates & merge**
  Run: `git add app/header.html app/footer.html`
  Run: `git commit -m "feat: connect navigation menu links to dynamic routes"`
