import type { Metadata } from "next";
import { assemblePage, loadBodyContent } from "@/lib/html-assembler";

export const metadata: Metadata = {
  title: "Campus Locations | CAPS Christ University",
  description:
    "Explore the six Christ University campuses where the Centre for Academic and Professional Support (CAPS) offers peer-led support.",
};

export default async function CampusLocationsPage() {
  const bodyContent = loadBodyContent("app/about/campus-locations/body.html");
  const assembledHtml = assemblePage(bodyContent, "/about/campus-locations");

  return (
    <div
      dangerouslySetInnerHTML={{ __html: assembledHtml }}
      suppressHydrationWarning
    />
  );
}
