import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RoarSQL",
  description:
    "Elevate Query Writing: RoarSQL's Natural Language AI Assistant for Developers",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <Script src='https://www.googletagmanager.com/gtag/js?id=G-8LCD453H7R' />
        <Script id='google-analytics'>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-8LCD453H7R');
        `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
