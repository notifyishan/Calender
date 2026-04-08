import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeInit = `(function(){try{var t=localStorage.getItem('wall-cal-theme');if(t==='dark'||!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){}})();`;

export const metadata: Metadata = {
  title: "Interactive wall calendar",
  description:
    "Wall-calendar style UI with date range selection and integrated notes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gradient-to-b from-stone-200/90 via-stone-100 to-stone-200/85 text-stone-900 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 dark:text-stone-100">
        <Script id="wall-cal-theme" strategy="beforeInteractive">
          {themeInit}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
