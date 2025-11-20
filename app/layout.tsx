import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { LocaleProvider } from "@/contexts/LocaleContext";

const notoSansTC = Noto_Sans_TC({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-noto-sans-tc",
});

export const metadata: Metadata = {
  title: "蘑菇的家",
  description: "日文學習遊戲與資料",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            /* 隱藏 Next.js 開發指示器 */
            #__next-build-watcher,
            [data-nextjs-toast],
            [data-nextjs-dialog],
            iframe[src*="__nextjs"] {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }
          `
        }} />
      </head>
      <body
        className={`${notoSansTC.variable} antialiased`}
        style={{ fontFamily: 'var(--font-noto-sans-tc), "Noto Sans TC", sans-serif' }}
      >
        <LocaleProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </LocaleProvider>
      </body>
    </html>
  );
}
