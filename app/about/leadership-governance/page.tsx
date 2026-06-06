import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership & Governance | CAPS Christ University",
  description:
    "Meet the CAPS leadership team of experienced student coordinators, team leads and teacher mentors.",
};

export default function LeadershipGovernancePage() {
  const filePath = path.join(process.cwd(), "app/leadership-body.html");
  const htmlContent = fs.readFileSync(filePath, "utf8");

  return (
    <>
      <link
        href="/css/leadership-specific.css"
        rel="stylesheet"
        type="text/css"
      />
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        suppressHydrationWarning
      />
    </>
  );
}
