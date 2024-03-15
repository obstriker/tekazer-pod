import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignIn } from "@clerk/nextjs";
import Navbar from "@/components/shared/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tekazer-Pod",
  description: "Summarize podcasts and save time!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables: {colorPrimary: '#624cf5'}
    }}>
    <html lang="en">
      <body className={inter.className}>
        <Navbar></Navbar>
        {children}
        </body>
    </html>
    </ClerkProvider>
  );
}
