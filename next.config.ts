import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
    output: "export",
    basePath: isProd ? "/spencerbowden.github.io" : "",
    assetPrefix: isProd ? "/spencerbowden.github.io/" : "",
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
