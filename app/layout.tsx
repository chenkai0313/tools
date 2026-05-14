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
  title: "Ken Webmaster Tools - Free Online Developer Tools",
  description: "Free online developer tools: JSON formatter, Base64 converter, timestamp converter, regex tester, hash calculator, password generator, QR code creator and more. 100% client-side, no data upload.",
  keywords: "webmaster tools, online developer tools, JSON formatter, Base64 encoder, timestamp converter, regex tester, hash calculator, password generator, QR code generator, cron expression parser, free online tools",
  icons: {
    icon: '/favicon.svg',
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
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2997084266989115" crossOrigin="anonymous"></script>
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
