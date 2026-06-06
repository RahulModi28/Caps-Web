import type { Metadata } from "next";
import { assemblePage, loadBodyContent, injectFAQs } from "@/lib/html-assembler";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export const revalidate = 60; // Revalidate page updates every 60 seconds

export const metadata: Metadata = {
  title: "Leadership & Governance | CAPS Christ University",
  description:
    "Meet the CAPS leadership team of experienced student coordinators, team leads and teacher mentors.",
};

export default async function LeadershipGovernancePage() {
  let bodyContent = loadBodyContent("app/about/leadership-governance/body.html");

  if (isSupabaseConfigured()) {
    try {
      const { data: faqs, error } = await supabase!
        .from('faqs')
        .select('*')
        .eq('category', 'leadership-governance')
        .order('display_order', { ascending: true });
      
      if (!error && faqs && faqs.length > 0) {
        bodyContent = injectFAQs(bodyContent, faqs);
      }
    } catch (e) {
      console.error("Error loading FAQs for leadership-governance from Supabase:", e);
    }
  }

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
