import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { QueryProvider } from "@/components/shared/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PRIORITY AQUA - Premium Water Delivery",
  description: "Kenya's leading water delivery platform. Order bottled water, refills, and bulk tanker delivery to your doorstep.",
  keywords: "water delivery, bottled water, water refill, bulk water, Nairobi, Kenya, M-Pesa",
  authors: [{ name: "Priority Aqua" }],
  openGraph: {
    title: "PRIORITY AQUA - Premium Water Delivery",
    description: "Clean water delivered to your doorstep in 2 hours",
    type: "website",
    locale: "en_KE",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
