import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Orbitron } from "next/font/google";
import "@/styles/globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "MonPro-AI | Premium Automation Consultancy",
  description:
    "Identifying Revenue Leaks and Manual Friction to install a self-driving business OS.",
  keywords: [
    "automation",
    "AI",
    "business optimization",
    "revenue recovery",
    "e-commerce",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable} ${orbitron.variable}`}>
      <body className="font-sans">
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
