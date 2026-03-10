import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Merlin Leadership | Strategic Advisory",
  description:
    "Merlin Leadership partners with executives and organizations to navigate complex challenges, unlock strategic clarity, and drive meaningful growth.",
  openGraph: {
    title: "Merlin Leadership | Strategic Advisory",
    description:
      "Executive advisory and strategic consulting for organizations that demand more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grain">{children}</body>
    </html>
  );
}
