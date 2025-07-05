import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { ClientLayout } from "@/components/layout/ClientLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DSpace - Modern E-commerce Platform",
  description: "A modern e-commerce platform built with Next.js, Redux Toolkit, and Tailwind CSS",
  keywords: ["e-commerce", "nextjs", "react", "typescript", "tailwind"],
  authors: [{ name: "DSpace Team" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
