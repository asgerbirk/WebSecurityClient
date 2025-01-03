import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/components-navbar";
import  SessionProvider  from "@/components/SessionProvider";
import {getServerSession} from "next-auth";

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
  title: "Zando Fitness",
  description: "Transform Your Body, Transform Your Life",
};

export default async function RootLayout({
                                           children,
                                         }: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
      <html lang="en">
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <SessionProvider session={session}>
        <Navbar/>
        {children}
      </SessionProvider>
      </body>
      </html>
  );
}
