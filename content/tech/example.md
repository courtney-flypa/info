---
title: "Next.js 靜態導出實戰經驗"
date: "2024-01-20"
excerpt: "分享使用 Next.js 進行靜態網站導出的實戰經驗和注意事項。"
category: "tech"
---

# Next.js 靜態導出實戰經驗

最近在開發一個需要部署到 GitHub Pages 的專案，選擇了 Next.js 的靜態導出功能。這裡分享一些實戰經驗。

## 為什麼選擇靜態導出？

GitHub Pages 只支援靜態網站，而 Next.js 的 `output: 'export'` 選項可以將整個應用導出為靜態 HTML 文件。

## 配置步驟

### 1. 更新 next.config.ts

```typescript
const nextConfig = {
  output: 'export',
  basePath: '/your-repo-name',
  images: {
    unoptimized: true,
  },
};
```

### 2. 處理動態路由

使用 `generateStaticParams` 來預先生成所有動態路由：

```typescript
export function generateStaticParams() {
  return [
    { slug: 'article-1' },
    { slug: 'article-2' },
  ];
}
```

## 注意事項

1. **不能使用 API Routes** - 靜態導出不支援服務器端功能
2. **圖片優化** - 需要設置 `images.unoptimized: true`
3. **basePath** - 如果部署到子路徑，記得設置 basePath

## 優點

- ✅ 完全靜態，載入速度快
- ✅ 可以部署到任何靜態網站託管服務
- ✅ SEO 友好

## 缺點

- ❌ 無法使用服務器端功能
- ❌ 無法使用 API Routes
- ❌ 需要預先生成所有頁面

## 總結

對於不需要服務器端功能的專案，Next.js 靜態導出是一個很好的選擇。它結合了 React 的開發體驗和靜態網站的性能優勢。

