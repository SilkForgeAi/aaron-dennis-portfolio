import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { mono, sans, serif } from "./fonts";
import "./globals.css";

const title = "Aaron Dennis — Independent AI Systems Builder";
const description =
  "I build tools that let people direct AI agents and stay in control of what they do: desktop agent workspaces, runtime security controls and verification systems.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "Aaron Dennis",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#F6F4EF",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
