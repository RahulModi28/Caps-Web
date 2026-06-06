import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { assemblePage, loadBodyContent } from "@/lib/html-assembler";

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

  const bodyContent = loadBodyContent(config.file);
  const assembledHtml = assemblePage(bodyContent, `/learn/${page}`);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: assembledHtml }}
      suppressHydrationWarning
    />
  );
}
