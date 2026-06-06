-- 0. Clean existing data for the campus (cascade deletes all dependent tables)
DELETE FROM campuses WHERE id = '00000000-0000-0000-0000-000000000001';

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
-- We clear them or insert them. For SQL script, we can do TRUNCATE/DELETE first, or use INSERT ON CONFLICT. But since there is no unique constraint on (campus_id, question), we can just DELETE first.
DELETE FROM faqs;

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
),
(
    '00000000-0000-0000-0000-000000000001',
    'one-on-one-peer-training',
    'What materials should I upload before the session?',
    'Please upload any assignment guidelines, draft documents (Word or PDF format), and outline sheets. Sharing these 24 hours in advance gives your peer trainer time to prepare notes and structural reviews.',
    0
),
(
    '00000000-0000-0000-0000-000000000001',
    'one-on-one-peer-training',
    'Can I reschedule a session?',
    'Yes, you can cancel or reschedule up to 12 hours before the session. Failure to attend without informing the mentor thrice will suspend booking rights for the semester.',
    1
),
(
    '00000000-0000-0000-0000-000000000001',
    'group-peer-training',
    'Are certificates provided for group workshops?',
    'Yes, all active participants who attend all days of a bootcamp and complete the exit quiz will receive a CAPS Certificate of Participation.',
    0
),
(
    '00000000-0000-0000-0000-000000000001',
    'group-peer-training',
    'Can I request a prep circle for a specific subject?',
    'Absolutely! If a group of 5 or more students require support in a specific course module, you can submit a prep circle request form at the CAPS coordinator desk in Block B Room 227.',
    1
),
(
    '00000000-0000-0000-0000-000000000001',
    'connect-wide',
    'Who can participate in community outreach projects?',
    'Community outreach projects are open to all registered student volunteers. Selection for specific drives depends on past session engagement and brief interviews conducted by the Connect Wide lead.',
    0
),
(
    '00000000-0000-0000-0000-000000000001',
    'connect-wide',
    'How do I submit an alumni nomination?',
    'If you know a distinguished CAPS alumnus who would be interested in conducting a webinar, please email their profile details to the Media & PR committee desk or the Connect Wide Lead.',
    1
),
(
    '00000000-0000-0000-0000-000000000001',
    'research-assessment',
    'What is the cost of psychometric tests at CAPS?',
    'All psychometric learning diagnostic tests and feedback circles are conducted completely free of charge for all registered students of Christ University.',
    0
),
(
    '00000000-0000-0000-0000-000000000001',
    'research-assessment',
    'Can the mentor write the research paper for me?',
    'No. CAPS operates on a collaborative feedback model. Mentors guide, critique, and provide resources to improve your writing and design, but do not write, rewrite, or complete your research papers for you.',
    1
),
(
    '00000000-0000-0000-0000-000000000001',
    'learning-development',
    'L&D Student Coordinator',
    '<p>Email: <a href="mailto:learning.dev@caps.christuniversity.edu.in">learning.dev@caps.christuniversity.edu.in</a></p><p>Office: Block B Room 227 (CAPS Coordinator Hub)</p>',
    0
),
(
    '00000000-0000-0000-0000-000000000001',
    'media-pr',
    'Media & PR Student Lead',
    '<p>Email: <a href="mailto:media.pr@caps.christuniversity.edu.in">media.pr@caps.christuniversity.edu.in</a></p><p>Office: Floor 10 Central Block (Academic Desk)</p>',
    0
),
(
    '00000000-0000-0000-0000-000000000001',
    'operations-analytics',
    'Operations Team Lead',
    '<p>Email: <a href="mailto:ops.analytics@caps.christuniversity.edu.in">ops.analytics@caps.christuniversity.edu.in</a></p><p>Office: Room 227, Block B, Ground Floor (CAPS Desk)</p>',
    0
),
(
    '00000000-0000-0000-0000-000000000001',
    'tech-tank',
    'Tech Tank Coordinator',
    '<p>Email: <a href="mailto:techtank@caps.christuniversity.edu.in">techtank@caps.christuniversity.edu.in</a></p><p>Office: Floor 10 Central Block (Tech Lab)</p>',
    0
),
(
    '00000000-0000-0000-0000-000000000001',
    'leadership-governance',
    'What is the Centre for Academic and Professional Support (CAPS)?',
    'CAPS is a student-centric platform at CHRIST (Deemed to be University), Yeshwanthpur Campus, designed to facilitate academic excellence and professional readiness. We offer peer-to-peer mentoring, specialized workshops, writing support, and personal development opportunities to help students transition successfully into their professional careers.',
    0
),
(
    '00000000-0000-0000-0000-000000000001',
    'leadership-governance',
    'What are the different wings of CAPS and what services do they offer?',
    'CAPS operates through specialized wings to cover all aspects of student growth: <strong>One on One Peer Training</strong> offers individualized mentoring sessions focused on academic subjects, communication, and soft skills; <strong>Group Peer Training</strong> provides interactive group sessions, skill bootcamps, and exam preparation circles; <strong>Connect Wide</strong> drives extracurricular activities, university-wide events, and external community networking; and <strong>Research & Assessment</strong> supports student research initiatives, project guidance, and capability assessments.',
    1
),
(
    '00000000-0000-0000-0000-000000000001',
    'leadership-governance',
    'How can I book a session or register for CAPS workshops?',
    'Students can easily book a session by clicking the <strong>"BOOK A SESSION"</strong> button in the main navigation header or by visiting the CAPS portal directly. From the portal, you can select your preferred wing, choose a mentor, and schedule a convenient time slot.',
    2
),
(
    '00000000-0000-0000-0000-000000000001',
    'leadership-governance',
    'How can I join CAPS as a student coordinator, mentor, or team lead?',
    'CAPS recruits passionate student coordinators, mentors, and team leads at the start of each semester. Applications open university-wide, followed by a selection process based on academic proficiency, leadership skills, and peer coaching capability. Keep an eye on our announcements and social channels for application links.',
    3
),
(
    '00000000-0000-0000-0000-000000000001',
    'session-guidelines',
    'Before the Session',
    '<ul><li><strong>Upload Draft Materials:</strong> Submit your draft paper, prompt, data sheet, or project outline at least 24 hours prior to the session. This helps your trainer prepare customized feedback.</li><li><strong>Be Punctual:</strong> Arrive 5 minutes before the scheduled slot at block B room 227 or connect to the virtual call link on time.</li><li><strong>Clarify Goals:</strong> Have a specific question or topic in mind that you want to resolve during the 45-minute session.</li></ul>',
    0
),
(
    '00000000-0000-0000-0000-000000000001',
    'session-guidelines',
    'During the Session',
    '<ul><li><strong>Collaborative Exchange:</strong> CAPS is a coaching center, not a writing or correction factory. Peer trainers guide you; they will not write your papers or solve assignments for you.</li><li><strong>Active Participation:</strong> Bring a notebook or laptop, take notes, ask clarifying questions, and participate in exercises.</li><li><strong>Maintain Mutual Respect:</strong> Engage professionally, respect the peer trainers\' time, and value constructive critique.</li></ul>',
    1
),
(
    '00000000-0000-0000-0000-000000000001',
    'session-guidelines',
    'Cancellation & No-Show Policy',
    '<ul><li><strong>Cancel in Advance:</strong> If you cannot make it, reschedule or cancel at least 12 hours prior. This allows other students on the waitlist to claim the slot.</li><li><strong>Missed Sessions Policy:</strong> Three consecutive or non-consecutive no-shows without notification will result in a suspension of your booking privileges for the remainder of the semester.</li><li><strong>Emergency Circumstances:</strong> If you miss a slot due to medical reasons or scheduled classes, contact the operations desk to reactivate your profile.</li></ul>',
    2
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

-- 7. Insert Workshops
DELETE FROM workshops;

INSERT INTO workshops (campus_id, title, date_text, venue, description, icon_name, display_order)
VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'VBA and Excel Bootcamp',
    'June 15-18',
    'Floor 9 Central Block, Room 1006',
    'An intensive 4-day bootcamp covering macros, loops, variables, and automated sheet models.',
    'plant',
    0
),
(
    '00000000-0000-0000-0000-000000000001',
    'Research Writing Circle',
    'June 22',
    'Floor 1 Academic Block',
    'Focuses on literature review synthesis, referencing formatting, and drafting abstracts.',
    'star',
    1
),
(
    '00000000-0000-0000-0000-000000000001',
    'Mid-Sem Math Revision',
    'July 2-5',
    'Floor 9 Central Block',
    'Revision circle on advanced calculus, matrices, and linear algebra modules before exam cycles.',
    'globe',
    2
);
