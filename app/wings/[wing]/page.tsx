import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { assemblePage, loadBodyContent } from "@/lib/html-assembler";

interface Props {
  params: Promise<{ wing: string }>;
}

const wingMap: Record<string, { title: string; file: string }> = {
  "one-on-one-peer-training": {
    title: "One on One Peer Training | CAPS",
    file: "app/wings/content/one-on-one-peer-training.html",
  },
  "group-peer-training": {
    title: "Group Peer Training | CAPS",
    file: "app/wings/content/group-peer-training.html",
  },
  "connect-wide": {
    title: "Connect Wide | CAPS",
    file: "app/wings/content/connect-wide.html",
  },
  "research-assessment": {
    title: "Research & Assessment | CAPS",
    file: "app/wings/content/research-assessment.html",
  },
};

export async function generateStaticParams() {
  return Object.keys(wingMap).map((wing) => ({ wing }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { wing } = await params;
  const config = wingMap[wing];
  if (!config) return {};
  return {
    title: config.title,
    description: `Explore ${config.title} services and offerings at CAPS Christ University Yeshwanthpur Campus.`,
  };
}

export default async function WingPage({ params }: Props) {
  const { wing } = await params;
  const config = wingMap[wing];
  if (!config) notFound();

  const bodyContent = loadBodyContent(config.file);
  const assembledHtml = assemblePage(bodyContent, `/wings/${wing}`);

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
