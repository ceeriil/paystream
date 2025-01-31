/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: any) => {
    // Add externals
    config.externals.push("pino-pretty", "lokijs", "encoding");

    // Handle source maps properly
    config.module.rules.push({
      test: /\.js\.map$/,
      enforce: "pre",
      use: ["source-map-loader"],
    });

    // Handle all declaration files and source maps
    config.module.rules.push({
      test: /\.(d\.ts|d\.ts\.map|js\.map)$/,
      use: "null-loader",
      type: "javascript/auto",
    });

    // Handle .mjs files
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    });

    // Ignore specific problematic modules
    config.resolve.alias = {
      ...config.resolve.alias,
      "@metamask/sdk-communication-layer": false,
    };

    // Disable source maps in production
    if (config.mode === "production") {
      config.devtool = false;
    }

    return config;
    
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
