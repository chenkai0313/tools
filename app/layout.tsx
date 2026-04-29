import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "站长工具 - 为站长和开发者提供的在线工具集",
  description: "免费在线站长工具，包括时间戳转换、JSON格式化、Base64图片转换、密码生成、Cron表达式解析等实用工具。",
  keywords: "站长工具, 在线工具, 时间戳转换, JSON格式化, Base64, 密码生成, Cron",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "站长工具 - 在线工具集",
    description: "为站长和开发者提供实用的在线工具",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
