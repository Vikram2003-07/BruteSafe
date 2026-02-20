import { Shield, Lock, Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 md:px-6 lg:py-10">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-4">
          {/* Logo & Branding */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/20 transition-all duration-300 group-hover:shadow-emerald-500/40 group-hover:scale-105">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                BruteSafe
              </span>
            </Link>
            <p className="text-xs text-muted-foreground text-center md:text-left max-w-[200px]">
              Your privacy-first password security toolkit
            </p>
          </div>

          {/* Privacy Indicator - Centered on mobile */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="relative flex h-2.5 w-2.5 items-center justify-center">
              <div className="absolute h-full w-full rounded-full bg-emerald-500 animate-ping opacity-75" />
              <div className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </div>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Zero-Knowledge • Client-Side Only
            </span>
          </div>

          {/* Links & Open Source */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Vikram2003-07/BruteSafe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Github className="h-4 w-4" />
              <span>Open Source</span>
            </a>
            <div className="h-4 w-px bg-border/60" />
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              <span>Secure</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-border/60 to-transparent" />

        {/* Copyright Section */}
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} BruteSafe. Built with{" "}
            <span className="text-red-500">❤️</span> for Privacy-Conscious
            Users.
          </p>
          <p className="text-xs text-muted-foreground/70 max-w-md leading-relaxed">
            No passwords are stored, transmitted, or logged. All processing
            happens locally in your browser.
          </p>
        </div>
      </div>
    </footer>
  );
}
