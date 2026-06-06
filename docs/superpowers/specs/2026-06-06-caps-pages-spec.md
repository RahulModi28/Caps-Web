# CAPS Website - Menu Pages Content & Layout Specification

* **Date:** 2026-06-06
* **Project:** Christ University CAPS Portal Redesign
* **Author:** Antigravity AI
* **Status:** Draft for Review

---

## 1. Routes & Page Architecture

We are creating 15 new pages mapped directly to the navigation menu structure. All pages will follow the clean routing convention and dynamic HTML assembly (`header.html` + `body.html` + `footer.html`).

| Navigation Category | Menu Item | Route Path | Layout Template |
|---------------------|-----------|------------|-----------------|
| **Wings** | One on One Peer Training | `/wings/one-on-one-peer-training` | Wings Template |
| | Group Peer Training | `/wings/group-peer-training` | Wings Template |
| | Connect Wide | `/wings/connect-wide` | Wings Template |
| | Research & Assessment | `/wings/research-assessment` | Wings Template |
| **Committees** | Media & PR | `/committees/media-pr` | Committees Template |
| | Learning & Development | `/committees/learning-development` | Committees Template |
| | Operations & Analytics | `/committees/operations-analytics` | Committees Template |
| | Tech Tank | `/committees/tech-tank` | Committees Template |
| **Learn** | Peer Mentoring | `/learn/peer-mentoring` | Learn Template |
| | Self-Guided Modules | `/learn/self-guided-modules` | Learn Template |
| | Workshop Schedules | `/learn/workshop-schedules` | Learn Template |
| | Volunteer Registration | `/learn/volunteer-registration` | Learn Template |
| **Resources** | FAQs | `/resources/faqs` | Resources Template |
| | Session Guidelines | `/resources/session-guidelines` | Resources Template |
| | Writing Handbooks | `/resources/writing-handbooks` | Resources Template |
| | Reference Materials | `/resources/reference-materials` | Resources Template |

---

## 2. Standardized Layout Templates

To maintain complete visual consistency and inherit Webflow's animations, we will use the class names and DOM structures from `caps-body.html` and `leadership-body.html`.

### A. Wings Template Layout
Used across all **Wings** pages.
1. **Hero Header (`.section_header`)**: Breadcrumbs slot (`Home > Wings > [Page Title]`), EB Garamond title, and a background image with a dark gradient blur.
2. **Editorial Intro (`.section_2-col-info-block` with `image-right` layout)**:
   * Left: Headline in `EB Garamond` italic + description in regular size + CTA button.
   * Right: Collaboration photo with a `1/1` aspect ratio and parallax layer.
3. **Focus Offerings Grid (`.section_card-stack`)**:
   * Centered section title (`<h2><em>Core Focus Areas</em></h2>`).
   * 3-column white card list (`.card-stack_card`) displaying specific areas of coaching or assessments.
4. **How It Works Timeline (`.section_intro` styled as a progress timeline)**:
   * 4-step progress layout: `Book a Slot` ➔ `Upload Pre-work` ➔ `Coaching Session` ➔ `Feedback & Certificate`.
5. **Session Guidelines (`.section_faq`)**:
   * Left: "Session Guidelines & Code of Conduct".
   * Right: Expandable accordions with session preparation checklists.
6. **Bottom Action CTA (`.section_cta` with glassmorphic styling)**:
   * Center-aligned card with gold button driving students to the booking portal.

### B. Committees Template Layout
Used across all **Committees** pages.
1. **Hero Header (`.section_header`)**: Breadcrumbs (`Home > Committees > [Page Title]`), EB Garamond title, background image.
2. **Editorial Intro (`.section_2-col-info-block` with `image-left` layout)**:
   * Left: headline + description of the committee's scope and duties.
   * Right: high-quality image of student committee members working.
3. **Key Deliverables & Tasks (`.section_card-stack`)**:
   * Section title (`<h2><em>Responsibilities & Deliverables</em></h2>`).
   * 4-column white cards grid showing the specific responsibilities of the committee.
4. **Skills Gained (`.section_intro`)**:
   * Brief bulleted explanation of why students should join and what skills they will develop.
5. **Lead Contacts (`.section_faq` style profile cards)**:
   * Grid of the committee's Student Coordinators and Faculty Mentors with direct email links.
6. **Recruitment CTA (`.section_cta`)**:
   * Glassmorphic bottom banner driving applications during recruitment cycles.

### C. Learn Template Layout (Flexible Informational Layout)
Used across **Learn** pages.
1. **Hero Header (`.section_header`)**: Breadcrumbs (`Home > Learn > [Page Title]`), background banner image.
2. **Detailed Overview (`.section_2-col-info-block`)**: High-fidelity introduction to the program or tool.
3. **Interactive Resource Grid / List (`.section_card-stack`)**: Displays either modules, events, or registration eligibility steps.
4. **Action Steps / Timelines (`.section_intro`)**: Step-by-step instructions.
5. **Registration CTA (`.section_cta`)**: Direct sign-up buttons.

### D. Resources Template Layout (Document / Document Filter Layout)
Used across **Resources** pages.
1. **Hero Header (`.section_header`)**: Breadcrumbs (`Home > Resources > [Page Title]`), background image.
2. **Intro Block (`.section_intro`)**: Brief description of available download categories and reference policies.
3. **Document Download Grid (`.section_card-stack`)**: 
   * A grid of card elements displaying file name, file size, format type (PDF/Docx), and a download button.
4. **Expandable Accordion List (`.section_faq`)**: (Specifically for the FAQs page) standard details accordion blocks.

---

## 3. Detailed Page Content Specifications

### 3.1. Wings Page Contents

#### Wing 1: One on One Peer Training (`/wings/one-on-one-peer-training`)
* **Hero Image:** `peer-network-center-1`
* **Intro Title:** *Personalized Mentoring* for Academic Excellence
* **Intro Text:** CAPS's One on One Peer Training wing offers student-to-student coaching to help you master challenging courses, refine your writing, and build professional skills. Book a session to get dedicated attention from a qualified senior peer trainer.
* **Core Offerings (3 Cards):**
  1. *Writing Support:* Development of essays, reports, research writing, thesis structuring, and editing.
  2. *Subject Coaching:* Help with economics, programming, mathematics, statistics, and domain subjects.
  3. *Soft Skills:* Presentation drills, mock interviews, and English communication practice.
* **Timeline Steps:**
  1. *Book Slot:* Go to the booking portal and choose a slot.
  2. *Share Pre-Work:* Upload your draft paper, prompt, or code 24 hours prior.
  3. *Engage:* Connect with your peer trainer for a 45-minute collaborative feedback session.
  4. *Review:* Receive your session feedback summary and certificate.
* **CTA Button:** Book a One-on-One Session (Links to Google Portal)

#### Wing 2: Group Peer Training (`/wings/group-peer-training`)
* **Hero Image:** `wing-group-peer-training`
* **Intro Title:** *Collaborative Learning* through Peer Groups
* **Intro Text:** Group Peer Training bridges classroom learning and practical application. We organize bootcamps, exam revision circles, and workshops where students learn, brainstorm, and solve problems together.
* **Core Focus Areas (3 Cards):**
  1. *Skill Bootcamps:* Intensive multi-day bootcamps on coding, technical writing, and spreadsheet management.
  2. *Exam Prep Circles:* Collaborative study circles organized before mid-semester and end-semester examinations.
  3. *Peer Lectures:* Student-led lectures unpacking complex academic concepts in an informal, interactive format.
* **Timeline Steps:**
  1. *Register:* Check the workshop calendar and register.
  2. *Attend:* Join the group session at the specified campus venue (e.g., Floor 9 Central Block).
  3. *Collaborate:* Participate in hands-on group exercises and discussions.
  4. *Certify:* Complete the exit quiz to receive your attendance certificate.
* **CTA Button:** View Workshop Schedules

#### Wing 3: Connect Wide (`/wings/connect-wide`)
* **Hero Image:** `wing-connect-wide`
* **Intro Title:** *Campus Integration* & Extracurricular Outreach
* **Intro Text:** Connect Wide coordinates larger extracurricular programs, networking events, and collaborative projects. We connect CAPS volunteers with external industries, alumni, and other campuses.
* **Core Focus Areas (3 Cards):**
  1. *Alumni Dialogues:* Dynamic panels and webinars featuring distinguished CAPS alumni sharing career paths.
  2. *Inter-Campus Collaborations:* Shared events, research symposiums, and debates with other Christ University campuses.
  3. *Community Projects:* Academic support outreach programs for local government schools and community centres.
* **Timeline Steps:**
  1. *Discover:* Keep track of campus announcements or the Connect Wide calendar.
  2. *Apply:* Register for the panel or outreach event.
  3. *Network:* Attend, engage, and connect with peers and mentors.
  4. *Contribute:* Join the volunteer team to help organize the next event.
* **CTA Button:** Explore Upcoming Events

#### Wing 4: Research & Assessment (`/wings/research-assessment`)
* **Hero Image:** `wing-research-assessment`
* **Intro Title:** *Empowering Inquiry* & Psychometric Assessment
* **Intro Text:** The Research & Assessment wing is dedicated to fostering a culture of academic research and inquiry. We provide guidance on research methodology, paper writing, and offer psychometric tests to evaluate learning styles.
* **Core Focus Areas (3 Cards):**
  1. *Research Mentoring:* Guiding students through literature reviews, data analysis, and citation formatting (APA/MLA).
  2. *Learning Style Assessments:* Scientific psychometric tests to help you discover and optimize your cognitive study style.
  3. *Draft Reviews:* Rigorous peer review of research abstracts and drafts before journal submission.
* **Timeline Steps:**
  1. *Request Review:* Submit your research draft or request a psychometric test.
  2. *Assessment:* Complete the test or match with a research mentor.
  3. *Feedback:* Attend a review meeting to discuss methods and structural edits.
  4. *Refine:* Polish your paper or implement your customized study strategy.
* **CTA Button:** Request Research Review

---

### 3.2. Committees Page Contents

#### Committee 1: Media & PR (`/committees/media-pr`)
* **Intro Title:** *Media & Public Relations*
* **Intro Text:** The Media & PR Committee is the voice of CAPS. We manage public relations, social media, photography, design, and news writing to ensure that the entire university community is informed of CAPS activities.
* **Deliverables Grid (4 Cards):**
  1. *Content Creation:* Writing blog articles, press releases, newsletters, and promotional copy.
  2. *Visual Design:* Creating premium flyers, banners, and digital assets following branding guidelines.
  3. *Social Media:* Managing Instagram, LinkedIn, and internal channels to drive student engagement.
  4. *Photography & Video:* Covering events, shooting tutor profiles, and editing recap reels.
* **Lead Contact Details:**
  * Media Team Lead: `media.pr@caps.christuniversity.edu.in`
  * Office Location: Floor 10 Central Block

#### Committee 2: Learning & Development (`/committees/learning-development`)
* **Intro Title:** *Learning & Development*
* **Intro Text:** L&D focuses on quality assurance and module design. We create training materials, vet new tutees/tutors, and run training programs to ensure CAPS mentors maintain highest standards.
* **Deliverables Grid (4 Cards):**
  1. *Module Design:* Developing guides and outlines for workshops, bootcamps, and peer circles.
  2. *Mentor Training:* Running train-the-trainer workshops to upskill new student coordinators.
  3. *Feedback Analytics:* Reviewing feedback sheets to identify topics requiring additional training resources.
  4. *Quality Assurance:* Conducting periodic audits of session effectiveness.
* **Lead Contact Details:**
  * L&D Team Lead: `learning.dev@caps.christuniversity.edu.in`

#### Committee 3: Operations & Analytics (`/committees/operations-analytics`)
* **Intro Title:** *Operations & Analytics*
* **Intro Text:** Operations & Analytics is the backbone of CAPS. We manage session schedules, database records, venue assignments, and compile reports on key performance parameters.
* **Deliverables Grid (4 Cards):**
  1. *Session Scheduling:* Managing tutee-tutor matches and rescheduling requests.
  2. *Database Management:* Maintaining secure records of session hours and certificates.
  3. *Venue Management:* Coordinating classroom and lab bookings with university admin.
  4. *Impact Reports:* Compiling semester reports on tutee feedback and session numbers.
* **Lead Contact Details:**
  * Operations Team Lead: `ops.analytics@caps.christuniversity.edu.in`

#### Committee 4: Tech Tank (`/committees/tech-tank`)
* **Intro Title:** *Tech Tank*
* **Intro Text:** Tech Tank builds and maintains the digital infrastructure of CAPS. We develop the website, automate booking workflows, and manage learning portals.
* **Deliverables Grid (4 Cards):**
  1. *Website Maintenance:* Ensuring high uptime, clean UI, and fast page load speeds.
  2. *Portal Development:* Developing and improving tutee matching databases.
  3. *Automation:* Building automated email notifications for bookings and feedback.
  4. *Technical Support:* Assisting other committees with software and server tools.
* **Lead Contact Details:**
  * Tech Tank Lead: `techtank@caps.christuniversity.edu.in`

---

### 3.3. Learn Page Contents

#### Page 1: Peer Mentoring (`/learn/peer-mentoring`)
* **Summary:** Deep dive into the structure of academic mentoring at Christ University Yeshwanthpur.
* **Process Steps:**
  1. *Eligibility Check:* Open to all undergraduate and postgraduate students.
  2. *Matching Questionnaire:* Complete the questionnaire detailings your learning gaps.
  3. *Tutor Assignment:* Pair with a senior peer tutor who excelled in that specific subject.
  4. *Regular Schedule:* Meet weekly for study sessions, practice runs, and reviews.

#### Page 2: Self-Guided Modules (`/learn/self-guided-modules`)
* **Summary:** Downloadable self-study guides, video links, and interactive slides covering core academic capabilities.
* **Focus Tabs:**
  * *Academic Writing:* Essays, citations, literature reviews.
  * *Presentation Skills:* Slide layout guidelines, verbal delivery, anxiety management.
  * *Technical Skills:* Excel templates, LaTeX setups, Git commands.

#### Page 3: Workshop Schedules (`/learn/workshop-schedules`)
* **Summary:** Comprehensive calendar of upcoming bootcamps, revision circles, and guest lectures.
* **Schedules List:**
  * *VBA and Excel Bootcamp:* June 15-18, Floor 9 Central Block, Room 1006.
  * *Research Paper Writing Circle:* June 22, Floor 1 Academic Block.
  * *Mid-Sem Math Revision Circle:* July 2-5, Floor 9 Central Block.

#### Page 4: Volunteer Registration (`/learn/volunteer-registration`)
* **Summary:** Detailed overview of the CAPS volunteering structure, application deadlines, and student coordinator roles.
* **Volunteering Levels:**
  * *Level 1 (Volunteer):* Support operations, attend events, shadow peer trainers.
  * *Level 2 (Peer Trainer/Coordinator):* Conduct sessions, write modules, lead projects.
  * *Level 3 (Team Lead):* Coordinate committees, manage budgets, oversee quality.

---

### 3.4. Resources Page Contents

#### Page 1: FAQs (`/resources/faqs`)
* **Accordion Q&A Items:**
  * *Q: Who can book a session at CAPS?*
    *A:* Any student currently enrolled at CHRIST (Deemed to be University), Yeshwanthpur Campus, can book sessions completely free of charge.
  * *Q: Can I book a session for group assignments?*
    *A:* Yes, you can book a group session under the Group Peer Training or One-on-One wing.
  * *Q: Where are the CAPS offices located?*
    *A:* For Yeshwanthpur Campus, the CAPS office is located on Room 227, Block B, Ground Floor. Central campus offices are in Rooms 910 & 1006, Central Block.
  * *Q: How do I become a CAPS volunteer?*
    *A:* Keep an eye on student portal announcements. Applications open at the start of each semester.

#### Page 2: Session Guidelines (`/resources/session-guidelines`)
* **Guidelines Checklist:**
  * *Before the Session:* Upload draft materials 24 hours prior. Arrive 5 minutes before the scheduled time.
  * *During the Session:* Maintain respect, take notes, and collaborate instead of expecting the trainer to do your work.
  * *Cancellation Policy:* Cancel at least 12 hours in advance. Three missed sessions will lock your booking privileges for the semester.

#### Page 3: Writing Handbooks (`/resources/writing-handbooks`)
* **Download Grid (PDFs):**
  * *CAPS Academic Writing Guide (v2)* - PDF (1.4 MB)
  * *APA 7th Edition Citation Manual* - PDF (800 KB)
  * *MLA 9th Edition Quick Guide* - PDF (650 KB)
  * *Research Proposal Writing Handbook* - PDF (2.1 MB)

#### Page 4: Reference Materials (`/resources/reference-materials`)
* **Download Grid (Templates):**
  * *Microsoft Word Essay Template (APA/MLA format)* - Docx (120 KB)
  * *LaTeX Thesis Template (Christ University format)* - Zip (3.4 MB)
  * *PowerPoint Presentation Template* - Pptx (2.2 MB)

---

## 4. Verification & Validation Plan

1. **Static Assembly Build Check:** Execute `npm run build` at every checkpoint to ensure Next.js routing is fully intact.
2. **Branding Contrast Verification:** Verify that text color contrast in the newly created subpages satisfies WCAG 4.5:1 standards (Navy foreground text on Muted/Background colors).
3. **Interactive Validation:**
   * Test drawer slide-out menu links on every page to ensure navigation is circular.
   * Verify accordions toggle correctly and do not shift page layouts.
   * Check responsiveness on mobile (375px), tablet (768px), and desktop (1200px+).
