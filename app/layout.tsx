import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CAPS - Centre for Academic and Professional Support",
  description:
    "The Centre for Academic and Professional Support (CAPS) at Christ University fosters students' holistic growth by offering training, mentoring, and support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} scroll-smooth bg-slate-50 text-slate-900 antialiased min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
