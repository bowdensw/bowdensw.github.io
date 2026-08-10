import type { NextConfig } from "next";

// Served as a GitHub *user* page at https://bowdensw.github.io/ — root path, so no
// basePath or assetPrefix. Do not reintroduce them: Next prefixes its own JS/CSS but
// not raw <img src="/...">, which silently 404s every asset in production.
const nextConfig: NextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
