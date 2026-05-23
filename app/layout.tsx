import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "Ken Webmaster Tools - Free Online Developer Tools",
  description: "Free online developer tools: JSON formatter, Base64 converter, timestamp converter, regex tester, hash calculator, password generator, QR code creator and more. 100% client-side, no data upload.",
  keywords: "webmaster tools, online developer tools, JSON formatter, Base64 encoder, timestamp converter, regex tester, hash calculator, password generator, QR code generator, cron expression parser, free online tools",
  icons: {
    icon: 'data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22%3E%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 stop-color=%22%236366f1%22/%3E%3Cstop offset=%2250%25%22 stop-color=%22%23a855f7%22/%3E%3Cstop offset=%22100%25%22 stop-color=%22%23ec4899%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%2232%22 height=%2232%22 rx=%228%22 fill=%22url(%23g)%22/%3E%3Ctext x=%2216%22 y=%2222%22 font-family=%22system-ui,sans-serif%22 font-size=%2218%22 font-weight=%22800%22 fill=%22white%22 text-anchor=%22middle%22%3EK%3C/text%3E%3C/svg%3E',
  },
  openGraph: {
    title: "Ken Webmaster Tools - Free Online Developer Tools",
    description: "Free online toolkit for developers and webmasters. All tools run in your browser - no upload, no backend, privacy first.",
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
      <head>
        <meta name="baidu-site-verification" content="codeva-D3JK5USaIt" />
<script dangerouslySetInnerHTML={{
          __html: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?58507b69aa7c6518ec1a830b30ab4bff";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
          })();
          `
        }} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
