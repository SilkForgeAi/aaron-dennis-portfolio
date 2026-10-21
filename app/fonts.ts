import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";

// next/font downloads these at build time and serves them from the site itself,
// so the page makes no runtime requests to Google.
export const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
