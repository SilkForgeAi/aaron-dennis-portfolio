import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes a plain HTML/CSS/JS site to `out/`.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
