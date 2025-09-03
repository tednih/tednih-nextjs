"use client";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { SessionProvider } from "next-auth/react";
import Breadcrumb from "./components/breadCrumb";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ThemeProvider enableSystem={true} attribute="class">
          <SessionProvider>
            <Navbar />
            <main className="bg py-[55px]">
              <div className="flex ml-6 py-5 text-center">
                <Breadcrumb className="w-6 h-6" />
              </div>
              {children}
            </main>
            <Footer />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
