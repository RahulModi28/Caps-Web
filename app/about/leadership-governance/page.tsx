import type { Metadata } from "next";
import { assemblePage, loadBodyContent } from "@/lib/html-assembler";

export const metadata: Metadata = {
  title: "Leadership & Governance | CAPS Christ University",
  description:
    "Meet the CAPS leadership team of experienced student coordinators, team leads and teacher mentors.",
};

export default function LeadershipGovernancePage() {
  const bodyContent = loadBodyContent("app/about/leadership-governance/body.html");
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
