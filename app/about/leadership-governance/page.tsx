import type { Metadata } from "next";
import { assemblePage, loadBodyContent, injectFAQs } from "@/lib/html-assembler";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import TeamLeadSlider from "./TeamLeadSlider";

export const revalidate = 60; // Revalidate page updates every 60 seconds

export const metadata: Metadata = {
  title: "Leadership & Governance | CAPS Christ University",
  description:
    "Meet the CAPS leadership team of experienced student coordinators, team leads and teacher mentors.",
};

const SPLIT_MARKER = "<!--TLS_INSERT_POINT-->";

export default async function LeadershipGovernancePage() {
  let bodyContent = loadBodyContent("app/about/leadership-governance/body.html");

  if (isSupabaseConfigured()) {
    try {
      const { data: faqs, error } = await supabase!
        .from("faqs")
        .select("*")
        .eq("category", "leadership-governance")
        .order("display_order", { ascending: true });

      if (!error && faqs && faqs.length > 0) {
        bodyContent = injectFAQs(bodyContent, faqs);
      }
    } catch (e) {
      console.error(
        "Error loading FAQs for leadership-governance from Supabase:",
        e
      );
    }
  }

  const assembledHtml = assemblePage(bodyContent, "/about/leadership-governance");

  // Split the HTML at the marker so we can inject the React slider between sections
  const markerIndex = assembledHtml.indexOf(SPLIT_MARKER);
  const hasSplit = markerIndex !== -1;
  const htmlBefore = hasSplit
    ? assembledHtml.slice(0, markerIndex)
    : assembledHtml;
  const htmlAfter = hasSplit
    ? assembledHtml.slice(markerIndex + SPLIT_MARKER.length)
    : "";

  return (
    <>
      <link
        href="/css/leadership-specific.css"
        rel="stylesheet"
        type="text/css"
      />
      {/* Header + Student Coordinators section */}
      <div
        dangerouslySetInnerHTML={{ __html: htmlBefore }}
        suppressHydrationWarning
      />
      {/* Team Leads infinite marquee — inserted between coordinators and explore */}
      {hasSplit && <TeamLeadSlider />}
      {/* Remaining HTML — explore-caps, next-pages, footer, etc. */}
      {hasSplit && (
        <div
          dangerouslySetInnerHTML={{ __html: htmlAfter }}
          suppressHydrationWarning
        />
      )}
    </>
  );
}
