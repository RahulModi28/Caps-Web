import type { Metadata } from "next";
import { assemblePage, loadBodyContent } from "@/lib/html-assembler";

export const metadata: Metadata = {
  title: "Core Objectives | CAPS Christ University",
  description:
    "Explore the core objectives of CAPS — from student-driven academic support and career readiness to leadership development and holistic student growth.",
};

export default async function CoreObjectivesPage() {
  const bodyContent = loadBodyContent("app/about/core-objectives/body.html");
  const assembledHtml = assemblePage(bodyContent, "/about/core-objectives");

  return (
    <div
      dangerouslySetInnerHTML={{ __html: assembledHtml }}
      suppressHydrationWarning
    />
  );
}
