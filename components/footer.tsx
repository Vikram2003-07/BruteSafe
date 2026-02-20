import { Shield } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo & tagline */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              BruteSafe
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              href="/strength-checker"
              className="hover:text-foreground transition-colors"
            >
              Strength Checker
            </Link>
            <Link
              href="/breach-check"
              className="hover:text-foreground transition-colors"
            >
              Breach Check
            </Link>
            <Link
              href="/generator"
              className="hover:text-foreground transition-colors"
            >
              Generator
            </Link>
          </nav>

          {/* Privacy */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Zero-Knowledge • Client-Side Only • Open Source</span>
          </div>
        </div>

        <div className="mt-6 border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} BruteSafe. Built with ❤️ for
            Privacy-Conscious Users.
          </p>
          <p className="mt-1">
            No passwords are stored, transmitted, or logged. All processing
            happens locally in your browser.
          </p>
        </div>
      </div>
    </footer>
  );
}
