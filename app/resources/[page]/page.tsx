import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { assemblePage, loadBodyContent, injectFAQs, injectReferenceMaterials } from "@/lib/html-assembler";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export const revalidate = 60; // Revalidate page updates every 60 seconds

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

  let bodyContent = loadBodyContent(config.file);

  if (isSupabaseConfigured()) {
    try {
      if (page === "faqs") {
        const { data: faqs, error } = await supabase!
          .from('faqs')
          .select('*')
          .eq('category', 'General')
          .order('display_order', { ascending: true });
        
        if (!error && faqs && faqs.length > 0) {
          bodyContent = injectFAQs(bodyContent, faqs);
        }
      } else if (page === "reference-materials") {
        const { data: materials, error } = await supabase!
          .from('reference_materials')
          .select('*')
          .order('display_order', { ascending: true });
        
        if (!error && materials && materials.length > 0) {
          bodyContent = injectReferenceMaterials(bodyContent, materials);
        }
      }
    } catch (e) {
      console.error(`Error loading dynamic content for /resources/${page} from Supabase:`, e);
    }
  }

  const assembledHtml = assemblePage(bodyContent, `/resources/${page}`);

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

