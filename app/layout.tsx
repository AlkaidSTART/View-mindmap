import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Job Pilot | 智能思维导图生成",
  description: "基于大型语言模型的自动化文档提取与思维导图生成平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="font-sans">
      <body className="antialiased">{children}</body>
    </html>
  );
}
