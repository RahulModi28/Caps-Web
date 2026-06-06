import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { assemblePage, loadBodyContent } from "@/lib/html-assembler";

interface Props {
  params: Promise<{ page: string }>;
}

const resourceMap: Record<string, { title: string; file: string }> = {
  "faqs": {
    title: "Frequently Asked Questions | CAPS",
    file: "app/resources/content/faqs.html",
  },
  "session-guidelines": {
    title: "Session Guidelines & Code of Conduct | CAPS",
    file: "app/resources/content/session-guidelines.html",
  },
  "writing-handbooks": {
    title: "Academic Writing Handbooks | CAPS",
    file: "app/resources/content/writing-handbooks.html",
  },
  "reference-materials": {
    title: "Academic Reference Materials | CAPS",
    file: "app/resources/content/reference-materials.html",
  },
};

export async function generateStaticParams() {
  return Object.keys(resourceMap).map((page) => ({ page }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const config = resourceMap[page];
  if (!config) return {};
  return {
    title: config.title,
    description: `Download academic resources, writing handbooks, and view ${config.title} details.`,
  };
}

export default async function ResourcePage({ params }: Props) {
  const { page } = await params;
  const config = resourceMap[page];
  if (!config) notFound();

  const bodyContent = loadBodyContent(config.file);
  const assembledHtml = assemblePage(bodyContent, `/resources/${page}`);

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
