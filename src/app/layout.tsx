import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meme new originals, movies and series - Disney++",
  description: "The greatest memes live here! Lock in and access unlimited entertainment on Disney++ The worlds biggest memeing service. Lifetime subscription $0.00.",
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
      </body>
    </html>
  );
}
