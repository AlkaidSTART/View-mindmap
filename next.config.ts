import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 用于 Docker 部署：产出最小化的运行时
  output: "standalone",
};

export default nextConfig;
