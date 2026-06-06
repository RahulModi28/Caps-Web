import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in .env.local to run the seeder.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DEFAULT_CAMPUS_ID = '00000000-0000-0000-0000-000000000001';

async function seed() {
  console.log('Starting Supabase Seeding Process...');

  // 1. Campus
  console.log('1. Seeding Campus...');
  const { error: campusError } = await supabase
    .from('campuses')
    .upsert({
      id: DEFAULT_CAMPUS_ID,
      name: 'Christ University Yeshwanthpur',
      domain: 'localhost',
      location: 'Bengaluru, India',
    }, { onConflict: 'name' });

  if (campusError) {
    console.error('Error seeding campus:', campusError.message);
    return;
  }

  // 2. Campus Updates
  console.log('2. Seeding Campus Updates...');
  const { error: updatesError } = await supabase
    .from('campus_updates')
    .insert([
      {
        campus_id: DEFAULT_CAMPUS_ID,
        title: 'New Consultation Desk Launched in Block B to Support Peer Sessions',
        summary: 'Refurbished CAPS consultation rooms opened to accommodate rising demand for sessions.',
        category: 'Campus Update',
        image_url: 'https://res.cloudinary.com/douvu5qu2/image/upload/f_auto,q_auto,w_auto/caps-website/peer-network-center-1',
        publish_date: '2026-06-02',
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        title: 'Placement Preparation Boot Camp Organized for Final Year Batches',
        summary: 'A comprehensive training session on group discussions and mock interviews was conducted by CAPS mentors.',
        category: 'Workshops',
        publish_date: '2026-02-09',
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        title: 'Orientation 2026: Welcoming New Student Mentors and Coordinators',
        summary: 'CAPS welcomed its new batch of student mentors and executives to drive academic support on campus.',
        category: 'Mentorship',
        publish_date: '2026-02-06',
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        title: 'Writing Centre Workshops Record High Student Participation',
        summary: 'More than 200 students attended the research paper writing and citation styling bootcamps this semester.',
        category: 'Writing Centre',
        publish_date: '2026-01-20',
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        title: 'Research & Publication Wing Announces Peer Review Assistance',
        summary: 'A dedicated desk has been established under the Research Wing to support student authors with manuscript reviews.',
        category: 'Research Wing',
        publish_date: '2026-01-10',
      },
    ]);

  if (updatesError) {
    console.error('Error seeding campus updates:', updatesError.message);
  }

  // 3. Self-Guided Modules
  console.log('3. Seeding Self-Guided Modules...');
  const { error: modulesError } = await supabase
    .from('self_guided_modules')
    .insert([
      {
        campus_id: DEFAULT_CAMPUS_ID,
        title: 'Academic Writing',
        category: 'writing',
        description: 'Guides covering essay structure, literature review methodology, and citation handbooks (APA, MLA, and Harvard formats).',
        icon_name: 'plant',
        resource_url: 'https://drive.google.com/drive/folders/YOUR_GOOGLE_DRIVE_FOLDER_LINK',
        display_order: 0,
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        title: 'Presentation Skills',
        category: 'presentation',
        description: 'Guides on presentation layout design, verbal delivery techniques, body language, and slide structure guidelines.',
        icon_name: 'star',
        resource_url: 'https://drive.google.com/drive/folders/YOUR_GOOGLE_DRIVE_FOLDER_LINK',
        display_order: 1,
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        title: 'Technical Skills',
        category: 'technical',
        description: 'Excel formulas & spreadsheet templates, LaTeX thesis document configurations, and basic git version control setups.',
        icon_name: 'globe',
        resource_url: 'https://drive.google.com/drive/folders/YOUR_GOOGLE_DRIVE_FOLDER_LINK',
        display_order: 2,
      },
    ]);

  if (modulesError) {
    console.error('Error seeding self-guided modules:', modulesError.message);
  }

  // 4. Reference Materials
  console.log('4. Seeding Reference Materials...');
  const { error: materialsError } = await supabase
    .from('reference_materials')
    .insert([
      {
        campus_id: DEFAULT_CAMPUS_ID,
        title: 'Word Essay Template',
        description: 'Pre-formatted Microsoft Word file with standard margins, fonts, line spacing, headings, and title page layouts in both APA and MLA formatting.',
        file_type: 'docx',
        file_size: '120 KB',
        download_url: 'https://drive.google.com/open?id=YOUR_FILE_ID_ON_GOOGLE_DRIVE',
        icon_name: 'plant',
        display_order: 0,
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        title: 'LaTeX Thesis Template',
        description: 'Complete LaTeX zip folder containing .cls document classes, sample chapters, figure slots, bibtex bibliography formats customized for Christ University reports.',
        file_type: 'zip',
        file_size: '3.4 MB',
        download_url: 'https://drive.google.com/open?id=YOUR_FILE_ID_ON_GOOGLE_DRIVE',
        icon_name: 'star',
        display_order: 1,
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        title: 'PowerPoint Template',
        description: 'Clean, premium PowerPoint slide layouts designed with the Christ University CAPS blue-and-gold aesthetic, featuring data charts, team profiles, and list layouts.',
        file_type: 'pptx',
        file_size: '2.2 MB',
        download_url: 'https://drive.google.com/open?id=YOUR_FILE_ID_ON_GOOGLE_DRIVE',
        icon_name: 'globe',
        display_order: 2,
      },
    ]);

  if (materialsError) {
    console.error('Error seeding reference materials:', materialsError.message);
  }

  // 5. FAQs
  console.log('5. Seeding FAQs...');
  const { error: faqsError } = await supabase
    .from('faqs')
    .insert([
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'General',
        question: 'Who can book a session at CAPS?',
        answer: 'Any student currently enrolled at CHRIST (Deemed to be University), Yeshwanthpur Campus, can book sessions completely free of charge.',
        display_order: 0,
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'General',
        question: 'Can I book a session for group assignments?',
        answer: 'Yes, you can book a group session under the Group Peer Training or One-on-One wing to review group reports, presentations, or project designs.',
        display_order: 1,
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'General',
        question: 'Where are the CAPS offices located?',
        answer: 'For Yeshwanthpur Campus, the CAPS desk is located at Block B, Room 227, Ground Floor. Central campus offices reside in Rooms 910 & 1006, Central Block.',
        display_order: 2,
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'General',
        question: 'How do I become a CAPS volunteer?',
        answer: 'Keep an eye on student portal announcements at the start of each semester. Applications open with briefing seminars, followed by registration submissions and brief interview audits.',
        display_order: 3,
      },
    ]);

  if (faqsError) {
    console.error('Error seeding FAQs:', faqsError.message);
  }

  // 6. Timeline Steps
  console.log('6. Seeding Timeline Steps...');
  const { error: timelinesError } = await supabase
    .from('timeline_steps')
    .insert([
      {
        campus_id: DEFAULT_CAMPUS_ID,
        page_route: '/learn/peer-mentoring',
        step_number: 1,
        step_title: 'Eligibility Check',
        step_description: 'Open to all undergraduate and postgraduate students seeking academic support.',
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        page_route: '/learn/peer-mentoring',
        step_number: 2,
        step_title: 'Matching Questionnaire',
        step_description: 'Complete the questionnaire detailing your syllabus, learning gaps, and slot availability.',
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        page_route: '/learn/peer-mentoring',
        step_number: 3,
        step_title: 'Tutor Assignment',
        step_description: 'Pair with a senior peer tutor who excelled in that specific subject and module.',
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        page_route: '/learn/peer-mentoring',
        step_number: 4,
        step_title: 'Regular Schedule',
        step_description: 'Meet weekly for study sessions, revision runs, practice worksheets, and progress reviews.',
      },
    ]);

  if (timelinesError) {
    console.error('Error seeding timeline steps:', timelinesError.message);
  }

  console.log('Seeding process completed!');
}

seed().catch((err) => {
  console.error('Seeding crashed:', err);
});
