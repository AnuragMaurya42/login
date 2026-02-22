import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Social Login Clone",
  description: "Snapchat, Instagram & LinkedIn login clones",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}