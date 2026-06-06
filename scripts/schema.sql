-- Enable uuid-ossp extension for generating UUIDs if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CAMPUSES TABLE (Tenant root)
CREATE TABLE campuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    domain VARCHAR(255) UNIQUE, -- e.g., yeshwanthpur.christuniversity.in or localhost
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for campuses
ALTER TABLE campuses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to campuses" ON campuses FOR SELECT USING (true);

-- 2. CAMPUS UPDATES / NEWS FEED
CREATE TABLE campus_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campus_id UUID NOT NULL REFERENCES campuses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'Campus Update', -- e.g., 'Campus Update', 'Workshop'
    image_url TEXT, -- Hosted on Cloudinary
    publish_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for updates
ALTER TABLE campus_updates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to campus_updates" ON campus_updates FOR SELECT USING (true);

-- 3. SELF-GUIDED LEARNING MODULES
CREATE TABLE self_guided_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campus_id UUID NOT NULL REFERENCES campuses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'writing', 'presentation', 'technical'
    description TEXT NOT NULL,
    icon_name VARCHAR(100) DEFAULT 'plant', -- Lucide icon key
    resource_url TEXT, -- Google Drive shared link
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for modules
ALTER TABLE self_guided_modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to self_guided_modules" ON self_guided_modules FOR SELECT USING (true);

-- 4. REFERENCE MATERIALS & TEMPLATES
CREATE TABLE reference_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campus_id UUID NOT NULL REFERENCES campuses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    file_type VARCHAR(50) NOT NULL, -- e.g., 'docx', 'pptx', 'zip'
    file_size VARCHAR(50) NOT NULL, -- e.g., '120 KB', '3.4 MB'
    download_url TEXT NOT NULL, -- Google Drive shared link
    icon_name VARCHAR(100) DEFAULT 'file', -- Lucide icon key
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for materials
ALTER TABLE reference_materials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to reference_materials" ON reference_materials FOR SELECT USING (true);

-- 5. FAQs
CREATE TABLE faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campus_id UUID NOT NULL REFERENCES campuses(id) ON DELETE CASCADE,
    category VARCHAR(100) DEFAULT 'General',
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for faqs
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to faqs" ON faqs FOR SELECT USING (true);

-- 6. TIMELINE STEPS / GUIDES
CREATE TABLE timeline_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campus_id UUID NOT NULL REFERENCES campuses(id) ON DELETE CASCADE,
    page_route VARCHAR(255) NOT NULL, -- e.g., '/learn/peer-mentoring'
    step_number INT NOT NULL,
    step_title VARCHAR(255) NOT NULL,
    step_description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for timelines
ALTER TABLE timeline_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to timeline_steps" ON timeline_steps FOR SELECT USING (true);

-- 7. WORKSHOPS SCHEDULES
CREATE TABLE workshops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campus_id UUID NOT NULL REFERENCES campuses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    date_text VARCHAR(100) NOT NULL,
    venue VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon_name VARCHAR(100) DEFAULT 'plant',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for workshops
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to workshops" ON workshops FOR SELECT USING (true);

