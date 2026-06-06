-- 1. Insert Default Campus (Christ University Yeshwanthpur)
-- We use a fixed UUID so references remain stable across environments
INSERT INTO campuses (id, name, domain, location)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Christ University Yeshwanthpur',
    'localhost', -- Matches local Next.js dev server, can be changed to yeshwanthpur.christuniversity.in later
    'Bengaluru, India'
)
ON CONFLICT (name) DO UPDATE SET
    domain = EXCLUDED.domain,
    location = EXCLUDED.location;


-- 2. Insert Campus Updates
INSERT INTO campus_updates (campus_id, title, summary, category, image_url, publish_date)
VALUES 
(
    '00000000-0000-0000-0000-000000000001',
    'New Consultation Desk Launched in Block B to Support Peer Sessions',
    'Refurbished CAPS consultation rooms opened to accommodate rising demand for sessions.',
    'Campus Update',
    'https://res.cloudinary.com/douvu5qu2/image/upload/f_auto,q_auto,w_auto/caps-website/peer-network-center-1',
    '2026-06-02'
),
(
    '00000000-0000-0000-0000-000000000001',
    'Placement Preparation Boot Camp Organized for Final Year Batches',
    'A comprehensive training session on group discussions and mock interviews was conducted by CAPS mentors.',
    'Workshops',
    NULL,
    '2026-02-09'
),
(
    '00000000-0000-0000-0000-000000000001',
    'Orientation 2026: Welcoming New Student Mentors and Coordinators',
    'CAPS welcomed its new batch of student mentors and executives to drive academic support on campus.',
    'Mentorship',
    NULL,
    '2026-02-06'
),
(
    '00000000-0000-0000-0000-000000000001',
    'Writing Centre Workshops Record High Student Participation',
    'More than 200 students attended the research paper writing and citation styling bootcamps this semester.',
    'Writing Centre',
    NULL,
    '2026-01-20'
),
(
    '00000000-0000-0000-0000-000000000001',
    'Research & Publication Wing Announces Peer Review Assistance',
    'A dedicated desk has been established under the Research Wing to support student authors with manuscript reviews.',
    'Research Wing',
    NULL,
    '2026-01-10'
);


-- 3. Insert Self-Guided Modules
INSERT INTO self_guided_modules (campus_id, title, category, description, icon_name, resource_url, display_order)
VALUES 
(
    '00000000-0000-0000-0000-000000000001',
    'Academic Writing',
    'writing',
    'Guides covering essay structure, literature review methodology, and citation handbooks (APA, MLA, and Harvard formats).',
    'plant',
    'https://drive.google.com/drive/folders/YOUR_GOOGLE_DRIVE_FOLDER_LINK', -- Placed as a placeholder for coordinators to update
    0
),
(
    '00000000-0000-0000-0000-000000000001',
    'Presentation Skills',
    'presentation',
    'Guides on presentation layout design, verbal delivery techniques, body language, and slide structure guidelines.',
    'star',
    'https://drive.google.com/drive/folders/YOUR_GOOGLE_DRIVE_FOLDER_LINK',
    1
),
(
    '00000000-0000-0000-0000-000000000001',
    'Technical Skills',
    'technical',
    'Excel formulas & spreadsheet templates, LaTeX thesis document configurations, and basic git version control setups.',
    'globe',
    'https://drive.google.com/drive/folders/YOUR_GOOGLE_DRIVE_FOLDER_LINK',
    2
);


-- 4. Insert Reference Materials
INSERT INTO reference_materials (campus_id, title, description, file_type, file_size, download_url, icon_name, display_order)
VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'Word Essay Template',
    'Pre-formatted Microsoft Word file with standard margins, fonts, line spacing, headings, and title page layouts in both APA and MLA formatting.',
    'docx',
    '120 KB',
    'https://drive.google.com/open?id=YOUR_FILE_ID_ON_GOOGLE_DRIVE', -- Placeholder to download from Google Drive
    'plant',
    0
),
(
    '00000000-0000-0000-0000-000000000001',
    'LaTeX Thesis Template',
    'Complete LaTeX zip folder containing .cls document classes, sample chapters, figure slots, bibtex bibliography formats customized for Christ University reports.',
    'zip',
    '3.4 MB',
    'https://drive.google.com/open?id=YOUR_FILE_ID_ON_GOOGLE_DRIVE',
    'star',
    1
),
(
    '00000000-0000-0000-0000-000000000001',
    'PowerPoint Template',
    'Clean, premium PowerPoint slide layouts designed with the Christ University CAPS blue-and-gold aesthetic, featuring data charts, team profiles, and list layouts.',
    'pptx',
    '2.2 MB',
    'https://drive.google.com/open?id=YOUR_FILE_ID_ON_GOOGLE_DRIVE',
    'globe',
    2
);


-- 5. Insert FAQs
INSERT INTO faqs (campus_id, category, question, answer, display_order)
VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'General',
    'Who can book a session at CAPS?',
    'Any student currently enrolled at CHRIST (Deemed to be University), Yeshwanthpur Campus, can book sessions completely free of charge.',
    0
),
(
    '00000000-0000-0000-0000-000000000001',
    'General',
    'Can I book a session for group assignments?',
    'Yes, you can book a group session under the Group Peer Training or One-on-One wing to review group reports, presentations, or project designs.',
    1
),
(
    '00000000-0000-0000-0000-000000000001',
    'General',
    'Where are the CAPS offices located?',
    'For Yeshwanthpur Campus, the CAPS desk is located at Block B, Room 227, Ground Floor. Central campus offices reside in Rooms 910 & 1006, Central Block.',
    2
),
(
    '00000000-0000-0000-0000-000000000001',
    'General',
    'How do I become a CAPS volunteer?',
    'Keep an eye on student portal announcements at the start of each semester. Applications open with briefing seminars, followed by registration submissions and brief interview audits.',
    3
);


-- 6. Insert Timeline Steps
INSERT INTO timeline_steps (campus_id, page_route, step_number, step_title, step_description)
VALUES
(
    '00000000-0000-0000-0000-000000000001',
    '/learn/peer-mentoring',
    1,
    'Eligibility Check',
    'Open to all undergraduate and postgraduate students seeking academic support.'
),
(
    '00000000-0000-0000-0000-000000000001',
    '/learn/peer-mentoring',
    2,
    'Matching Questionnaire',
    'Complete the questionnaire detailing your syllabus, learning gaps, and slot availability.'
),
(
    '00000000-0000-0000-0000-000000000001',
    '/learn/peer-mentoring',
    3,
    'Tutor Assignment',
    'Pair with a senior peer tutor who excelled in that specific subject and module.'
),
(
    '00000000-0000-0000-0000-000000000001',
    '/learn/peer-mentoring',
    4,
    'Regular Schedule',
    'Meet weekly for study sessions, revision runs, practice worksheets, and progress reviews.'
);
