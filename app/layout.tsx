import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className={`scroll-smooth ${inter.variable} h-full`}>
      <body className="antialiased min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
