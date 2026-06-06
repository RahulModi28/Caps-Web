import { assemblePage, loadBodyContent } from "@/lib/html-assembler";

export default function Home() {
  const homeBody = loadBodyContent("app/home-body.html");
  const assembledHtml = assemblePage(homeBody, "/");

  return (
    <div
      dangerouslySetInnerHTML={{ __html: assembledHtml }}
      suppressHydrationWarning
    />
  );
}
