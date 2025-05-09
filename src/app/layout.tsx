import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/navbar";
import Background from "@/components/background";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <Background/>
          <Navbar />
          {/* <TRPCReactProvider> */}
          {children}
          <SpeedInsights />
          {/* </TRPCReactProvider> */}
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}
