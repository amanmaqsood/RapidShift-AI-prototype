import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { AppStateProvider } from "@/context/AppStateProvider";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RapidShift AI — Property Management",
  description:
    "AI-first property management for Deals with Dignity. WhatsApp-native rent, maintenance, and lease workflows.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="font-body">
        <AppStateProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </AppStateProvider>
      </body>
    </html>
  );
}
