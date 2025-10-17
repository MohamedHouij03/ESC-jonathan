import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocationPermission from "@/components/LocationPermission";
import Chatbot from "@/components/Chatbot";
import HeroSection from '@/components/HeroSection';
import ConditionalChatbot from "@/components/ConditionalChatbot";

export const metadata: Metadata = {
  title: "Exercise Strength Core",
  description: "Professional exercise and strength training platform",
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/favicon_io/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon_io/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  themeColor: "#ffffff",
  viewport: "width=device-width, initial-scale=1",
};

const inter = Inter({ subsets: ["latin"] });
const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Standard favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon_io/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        
        {/* Android Chrome Icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon_io/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon_io/android-chrome-512x512.png" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
        
        {/* Theme colors */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
      </head>
      <body className={`${inter.className} ${playfairDisplay.variable} overflow-x-hidden`} suppressHydrationWarning>
        <Navbar />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
        <LocationPermission />
        <ConditionalChatbot />
      </body>
    </html>
  );
}
