import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cemilan Sagu Tempe - Cemilan Sehat Tradisional Indonesia",
  description: "Nikmati cemilan sagu tempe yang renyah, sehat, dan lezat. 100% halal, tersertifikasi BPOM. Cemilan tradisional Indonesia dengan cita rasa autentik.",
  keywords: ["cemilan sagu tempe", "sagu tempe", "cemilan tradisional", "camilan sehat", "makanan ringan", "tempe", "kripik tempe"],
  authors: [{ name: "Cemilan Sagu Tempe Team" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Cemilan Sagu Tempe - Cemilan Tradisional Indonesia",
    description: "Cemilan sagu tempe renyah, sehat, dan halal. 100% tersertifikasi BPOM.",
    url: "https://chat.z.ai",
    siteName: "Cemilan Sagu Tempe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cemilan Sagu Tempe - Cemilan Tradisional Indonesia",
    description: "Cemilan sagu tempe renyah, sehat, dan halal. 100% tersertifikasi BPOM.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
