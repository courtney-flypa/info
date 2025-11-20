import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 禁用開發指示器
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  // GitHub Pages 靜態導出配置
  output: 'export',
  // 如果部署到 username.github.io/repo-name，需要設置 basePath
  basePath: '/info',
  // 圖片優化配置（靜態導出不支持默認的圖片優化）
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
