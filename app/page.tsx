import fs from "fs";
import path from "path";

export default function Home() {
  const filePath = path.join(process.cwd(), "app/caps-body.html");
  const htmlContent = fs.readFileSync(filePath, "utf8");

  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      suppressHydrationWarning
    />
  );
}
