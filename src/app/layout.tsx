import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"; // or your preferred toast library
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
  title: "Your App Name",
  description: "Your app description",
  manifest: "/manifest.json", // For PWA
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        {/* Navigation would go here */}
        <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
        {/* Footer would go here */}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
