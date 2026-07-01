import type { Metadata } from "next";
import { assemblePage, loadBodyContent } from "@/lib/html-assembler";

export const metadata: Metadata = {
  title: "Vision & Mission | CAPS Christ University",
  description:
    "Discover the vision and mission of CAPS — to be a global benchmark in student-led academic support, promoting knowledge exchange and holistic growth.",
};

export default async function VisionMissionPage() {
  const bodyContent = loadBodyContent("app/about/vision-mission/body.html");
  const assembledHtml = assemblePage(bodyContent, "/about/vision-mission");

  return (
    <div
      dangerouslySetInnerHTML={{ __html: assembledHtml }}
      suppressHydrationWarning
    />
  );
}
