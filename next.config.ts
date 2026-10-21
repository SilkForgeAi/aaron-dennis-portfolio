import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes a plain HTML/CSS/JS site to `out/`.
  output: "export",
  basePath: process.env.GITHUB_PAGES === "true" ? "/aaron-dennis-portfolio" : "",
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
