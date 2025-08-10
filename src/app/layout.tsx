// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Providers from "@/components/Providers";
import ConditionalWrapper from "@/components/ConditionalWrapper";
import { generateSEOMetadata } from "@/lib/seo";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    url: '/',
    keywords: [
      'community centre West Acton',
      'hall hire Acton',
      'community hub London',
      'facilities rental',
      'local events',
      'community programs',
      'meeting rooms Acton',
      'West London venue'
    ]
  });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} font-sans bg-white text-gray-900`}>
        <Providers>
          <ConditionalWrapper>
            {children}
          </ConditionalWrapper>
        </Providers>
      </body>
    </html>
  );
}
