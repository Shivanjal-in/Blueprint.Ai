export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/app/components/theme-provider";
import Navbar from "./components/Navbar";
import { MenuProvider } from "@/context/MenuContext";
const inter = Inter({ subsets: ["latin"] });
import "@fontsource-variable/cinzel";
import MobileBurgerView from "./components/MobileBurgerView";

export const metadata: Metadata = {
  title: "Blueprint.AI | SRS Generator",
  description:
    "Effortlessly generate precise, comprehensive SRS documents tailored to your project needs, enhancing clarity and reducing time-to-market. Ideal for developers, project managers, and businesses aiming for top-tier software solutions.",
  icons: "./favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionWrapper>
        <head>
          <meta name="image" content="/generate.png" />
          <meta name="whatsapp:image" content="/generate.png" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        </head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <MenuProvider>
            <Navbar />
            <MobileBurgerView/>
            {children}
            </MenuProvider>
          </ThemeProvider>
          <Toaster />
        </body>
      </SessionWrapper>
    </html>
  );
}
