import type { Metadata } from "next";
import { assemblePage, loadBodyContent } from "@/lib/html-assembler";
import MentorCardControls from "./MentorCardControls";

export const metadata: Metadata = {
  title: "Mentors | CAPS Christ University",
  description:
    "Meet the experienced faculty mentors and advisors guiding the Centre for Academic and Professional Support (CAPS) at Christ University.",
};

export default async function MentorsPage() {
  const bodyContent = loadBodyContent("app/about/mentors/body.html");
  const assembledHtml = assemblePage(bodyContent, "/about/mentors");

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: assembledHtml }}
        suppressHydrationWarning
      />
      <MentorCardControls />
    </>
  );
}
