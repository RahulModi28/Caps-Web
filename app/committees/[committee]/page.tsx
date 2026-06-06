import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { assemblePage, loadBodyContent } from "@/lib/html-assembler";

interface Props {
  params: Promise<{ committee: string }>;
}

const committeeMap: Record<string, { title: string; file: string }> = {
  "media-pr": {
    title: "Media & PR Committee | CAPS",
    file: "app/committees/content/media-pr.html",
  },
  "learning-development": {
    title: "Learning & Development Committee | CAPS",
    file: "app/committees/content/learning-development.html",
  },
  "operations-analytics": {
    title: "Operations & Analytics Committee | CAPS",
    file: "app/committees/content/operations-analytics.html",
  },
  "tech-tank": {
    title: "Tech Tank Committee | CAPS",
    file: "app/committees/content/tech-tank.html",
  },
};

export async function generateStaticParams() {
  return Object.keys(committeeMap).map((committee) => ({ committee }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { committee } = await params;
  const config = committeeMap[committee];
  if (!config) return {};
  return {
    title: config.title,
    description: `Learn more about the ${config.title} deliverables, members, and recruitment at CAPS.`,
  };
}

export default async function CommitteePage({ params }: Props) {
  const { committee } = await params;
  const config = committeeMap[committee];
  if (!config) notFound();

  const bodyContent = loadBodyContent(config.file);
  const assembledHtml = assemblePage(bodyContent, `/committees/${committee}`);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: assembledHtml }}
      suppressHydrationWarning
    />
  );
}
