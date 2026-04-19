import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mantarna-2026.vercel.app"),
  title: "Mantrana Healthcare",
  description:
    "A collaborative healthcare transformation initiative connecting institutions, research, innovation, and digital technology for meaningful healthcare impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}