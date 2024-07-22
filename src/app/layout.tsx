import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AppProviders } from "@/components/AppProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Img2Text",
  description: "Web app to convert images to text",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={`${inter.className} bg-black`}>
        <main>
          <AppProviders>{children}</AppProviders>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
