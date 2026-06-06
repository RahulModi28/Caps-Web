import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { assemblePage, loadBodyContent, injectSelfGuidedModules, injectTimelineSteps } from "@/lib/html-assembler";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export const revalidate = 60; // Revalidate page updates every 60 seconds

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

  let bodyContent = loadBodyContent(config.file);

  if (isSupabaseConfigured()) {
    try {
      if (page === "self-guided-modules") {
        const { data: modules, error } = await supabase!
          .from('self_guided_modules')
          .select('*')
          .order('display_order', { ascending: true });
        
        if (!error && modules && modules.length > 0) {
          bodyContent = injectSelfGuidedModules(bodyContent, modules);
        }
      } else if (page === "peer-mentoring") {
        const { data: steps, error } = await supabase!
          .from('timeline_steps')
          .select('*')
          .eq('page_route', '/learn/peer-mentoring')
          .order('step_number', { ascending: true });
        
        if (!error && steps && steps.length > 0) {
          bodyContent = injectTimelineSteps(bodyContent, steps);
        }
      }
    } catch (e) {
      console.error(`Error loading dynamic content for /learn/${page} from Supabase:`, e);
    }
  }

  const assembledHtml = assemblePage(bodyContent, `/learn/${page}`);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: assembledHtml }}
      suppressHydrationWarning
    />
  );
}

