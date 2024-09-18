import type { Metadata } from "next";
import Navbar from '@/app/components/Navbar';
import { ModalAlertProvider } from '@/app/context/ModalAlertContext'
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Credit Card Validator with Node.js",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <header>
      <Navbar></Navbar>
    </header>
    <main>
      <div className="container mx-auto px-4 py-4">
        <ModalAlertProvider>
          {children}
        </ModalAlertProvider>
      </div>
    </main>
    </body>
    </html>
  );
}