import type { Metadata } from "next";
import { assemblePage, loadBodyContent } from "@/lib/html-assembler";

export const metadata: Metadata = {
  title: "Who We Are | CAPS Christ University",
  description:
    "Learn about CAPS — the Centre for Academic and Professional Support, a student-led centre at Christ University bridging the gap between academia and industry.",
};

export default async function WhoWeArePage() {
  const bodyContent = loadBodyContent("app/about/who-we-are/body.html");
  const assembledHtml = assemblePage(bodyContent, "/about/who-we-are");

  return (
    <div
      dangerouslySetInnerHTML={{ __html: assembledHtml }}
      suppressHydrationWarning
    />
  );
}
