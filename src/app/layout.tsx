import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { CONTRACT_ADDRESS, SITE_URL } from "@/config/constants";
import CopyButton from "@/components/CopyButton";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meme new originals, movies and series - Disney++",
  description: "The greatest memes live here! Lock in and access unlimited entertainment on Disney++ The worlds biggest memeing service. Lifetime subscription $0.00.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Meme new originals, movies and series - Disney++",
    description: "The greatest memes live here! Lock in and access unlimited entertainment on Disney++ The worlds biggest memeing service. Lifetime subscription $0.00.",
    images: ["/images/Disney.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meme new originals, movies and series - Disney++",
    description: "The greatest memes live here! Lock in and access unlimited entertainment on Disney++ The worlds biggest memeing service. Lifetime subscription $0.00.",
    images: ["/images/Disney.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/images/favicon.png" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/images/favicon.png" />
      </head>
      <body className={inter.className}>
        <div className="w-full bg-yellow-500/10 text-yellow-300 text-xs md:text-sm py-2 px-4 text-center">
          No affiliation with Disney, Netflix, or any trademark owners. This is a meme project; not financial advice.
        </div>
        {children}
        <ChatWidget />
        <footer className="border-t border-white/10 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8 text-white/80 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-x-2">
              <span>Contract:</span>
              <code className="text-white">{CONTRACT_ADDRESS}</code>
              <CopyButton value={CONTRACT_ADDRESS} />
            </div>
            <div className="space-x-4">
              <Link href="/buy" className="underline">Buy</Link>
              <Link href="/home" className="underline">Home</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
