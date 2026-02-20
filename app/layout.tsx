import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "BruteSafe — Multi-Platform Password Security Toolkit",
  description:
    "A privacy-first password intelligence suite. Evaluate password strength, check breach exposure, and generate secure passwords — all without compromising your privacy.",
  keywords: [
    "password security",
    "password strength",
    "data breach check",
    "password generator",
    "cybersecurity",
    "privacy",
  ],
  authors: [{ name: "BruteSafe" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "BruteSafe — Password Security Toolkit",
    description:
      "Evaluate password strength, check breaches, and generate secure passwords. Zero-knowledge, client-side only.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "bg-card border-border text-card-foreground",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
