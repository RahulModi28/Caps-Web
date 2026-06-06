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
  
  // Clear existing FAQs first to avoid duplicates when running seeder multiple times
  await supabase.from('faqs').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const { error: faqsError } = await supabase
    .from('faqs')
    .insert([
      // General FAQs
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
      // wings/one-on-one-peer-training
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'one-on-one-peer-training',
        question: 'What materials should I upload before the session?',
        answer: 'Please upload any assignment guidelines, draft documents (Word or PDF format), and outline sheets. Sharing these 24 hours in advance gives your peer trainer time to prepare notes and structural reviews.',
        display_order: 0,
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'one-on-one-peer-training',
        question: 'Can I reschedule a session?',
        answer: 'Yes, you can cancel or reschedule up to 12 hours before the session. Failure to attend without informing the mentor thrice will suspend booking rights for the semester.',
        display_order: 1,
      },
      // wings/group-peer-training
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'group-peer-training',
        question: 'Are certificates provided for group workshops?',
        answer: 'Yes, all active participants who attend all days of a bootcamp and complete the exit quiz will receive a CAPS Certificate of Participation.',
        display_order: 0,
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'group-peer-training',
        question: 'Can I request a prep circle for a specific subject?',
        answer: 'Absolutely! If a group of 5 or more students require support in a specific course module, you can submit a prep circle request form at the CAPS coordinator desk in Block B Room 227.',
        display_order: 1,
      },
      // wings/connect-wide
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'connect-wide',
        question: 'Who can participate in community outreach projects?',
        answer: 'Community outreach projects are open to all registered student volunteers. Selection for specific drives depends on past session engagement and brief interviews conducted by the Connect Wide lead.',
        display_order: 0,
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'connect-wide',
        question: 'How do I submit an alumni nomination?',
        answer: 'If you know a distinguished CAPS alumnus who would be interested in conducting a webinar, please email their profile details to the Media & PR committee desk or the Connect Wide Lead.',
        display_order: 1,
      },
      // wings/research-assessment
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'research-assessment',
        question: 'What is the cost of psychometric tests at CAPS?',
        answer: 'All psychometric learning diagnostic tests and feedback circles are conducted completely free of charge for all registered students of Christ University.',
        display_order: 0,
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'research-assessment',
        question: 'Can the mentor write the research paper for me?',
        answer: 'No. CAPS operates on a collaborative feedback model. Mentors guide, critique, and provide resources to improve your writing and design, but do not write, rewrite, or complete your research papers for you.',
        display_order: 1,
      },
      // committees/learning-development
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'learning-development',
        question: 'L&D Student Coordinator',
        answer: '<p>Email: <a href="mailto:learning.dev@caps.christuniversity.edu.in">learning.dev@caps.christuniversity.edu.in</a></p><p>Office: Block B Room 227 (CAPS Coordinator Hub)</p>',
        display_order: 0,
      },
      // committees/media-pr
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'media-pr',
        question: 'Media & PR Student Lead',
        answer: '<p>Email: <a href="mailto:media.pr@caps.christuniversity.edu.in">media.pr@caps.christuniversity.edu.in</a></p><p>Office: Floor 10 Central Block (Academic Desk)</p>',
        display_order: 0,
      },
      // committees/operations-analytics
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'operations-analytics',
        question: 'Operations Team Lead',
        answer: '<p>Email: <a href="mailto:ops.analytics@caps.christuniversity.edu.in">ops.analytics@caps.christuniversity.edu.in</a></p><p>Office: Room 227, Block B, Ground Floor (CAPS Desk)</p>',
        display_order: 0,
      },
      // committees/tech-tank
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'tech-tank',
        question: 'Tech Tank Coordinator',
        answer: '<p>Email: <a href="mailto:techtank@caps.christuniversity.edu.in">techtank@caps.christuniversity.edu.in</a></p><p>Office: Floor 10 Central Block (Tech Lab)</p>',
        display_order: 0,
      },
      // about/leadership-governance
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'leadership-governance',
        question: 'What is the Centre for Academic and Professional Support (CAPS)?',
        answer: 'CAPS is a student-centric platform at CHRIST (Deemed to be University), Yeshwanthpur Campus, designed to facilitate academic excellence and professional readiness. We offer peer-to-peer mentoring, specialized workshops, writing support, and personal development opportunities to help students transition successfully into their professional careers.',
        display_order: 0,
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'leadership-governance',
        question: 'What are the different wings of CAPS and what services do they offer?',
        answer: 'CAPS operates through specialized wings to cover all aspects of student growth: <strong>One on One Peer Training</strong> offers individualized mentoring sessions focused on academic subjects, communication, and soft skills; <strong>Group Peer Training</strong> provides interactive group sessions, skill bootcamps, and exam preparation circles; <strong>Connect Wide</strong> drives extracurricular activities, university-wide events, and external community networking; and <strong>Research & Assessment</strong> supports student research initiatives, project guidance, and capability assessments.',
        display_order: 1,
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'leadership-governance',
        question: 'How can I book a session or register for CAPS workshops?',
        answer: 'Students can easily book a session by clicking the <strong>"BOOK A SESSION"</strong> button in the main navigation header or by visiting the CAPS portal directly. From the portal, you can select your preferred wing, choose a mentor, and schedule a convenient time slot.',
        display_order: 2,
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'leadership-governance',
        question: 'How can I join CAPS as a student coordinator, mentor, or team lead?',
        answer: 'CAPS recruits passionate student coordinators, mentors, and team leads at the start of each semester. Applications open university-wide, followed by a selection process based on academic proficiency, leadership skills, and peer coaching capability. Keep an eye on our announcements and social channels for application links.',
        display_order: 3,
      },
      // resources/session-guidelines
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'session-guidelines',
        question: 'Before the Session',
        answer: '<ul><li><strong>Upload Draft Materials:</strong> Submit your draft paper, prompt, data sheet, or project outline at least 24 hours prior to the session. This helps your trainer prepare customized feedback.</li><li><strong>Be Punctual:</strong> Arrive 5 minutes before the scheduled slot at block B room 227 or connect to the virtual call link on time.</li><li><strong>Clarify Goals:</strong> Have a specific question or topic in mind that you want to resolve during the 45-minute session.</li></ul>',
        display_order: 0,
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'session-guidelines',
        question: 'During the Session',
        answer: '<ul><li><strong>Collaborative Exchange:</strong> CAPS is a coaching center, not a writing or correction factory. Peer trainers guide you; they will not write your papers or solve assignments for you.</li><li><strong>Active Participation:</strong> Bring a notebook or laptop, take notes, ask clarifying questions, and participate in exercises.</li><li><strong>Maintain Mutual Respect:</strong> Engage professionally, respect the peer trainers\' time, and value constructive critique.</li></ul>',
        display_order: 1,
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        category: 'session-guidelines',
        question: 'Cancellation & No-Show Policy',
        answer: '<ul><li><strong>Cancel in Advance:</strong> If you cannot make it, reschedule or cancel at least 12 hours prior. This allows other students on the waitlist to claim the slot.</li><li><strong>Missed Sessions Policy:</strong> Three consecutive or non-consecutive no-shows without notification will result in a suspension of your booking privileges for the remainder of the semester.</li><li><strong>Emergency Circumstances:</strong> If you miss a slot due to medical reasons or scheduled classes, contact the operations desk to reactivate your profile.</li></ul>',
        display_order: 2,
      }
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

  // 7. Workshops
  console.log('7. Seeding Workshops...');
  
  // Clear existing workshops to avoid duplicates
  await supabase.from('workshops').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const { error: workshopsError } = await supabase
    .from('workshops')
    .insert([
      {
        campus_id: DEFAULT_CAMPUS_ID,
        title: 'VBA and Excel Bootcamp',
        date_text: 'June 15-18',
        venue: 'Floor 9 Central Block, Room 1006',
        description: 'An intensive 4-day bootcamp covering macros, loops, variables, and automated sheet models.',
        icon_name: 'plant',
        display_order: 0,
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        title: 'Research Writing Circle',
        date_text: 'June 22',
        venue: 'Floor 1 Academic Block',
        description: 'Focuses on literature review synthesis, referencing formatting, and drafting abstracts.',
        icon_name: 'star',
        display_order: 1,
      },
      {
        campus_id: DEFAULT_CAMPUS_ID,
        title: 'Mid-Sem Math Revision',
        date_text: 'July 2-5',
        venue: 'Floor 9 Central Block',
        description: 'Revision circle on advanced calculus, matrices, and linear algebra modules before exam cycles.',
        icon_name: 'globe',
        display_order: 2,
      },
    ]);

  if (workshopsError) {
    console.error('Error seeding workshops:', workshopsError.message);
  }

  console.log('Seeding process completed!');
}

seed().catch((err) => {
  console.error('Seeding crashed:', err);
});
