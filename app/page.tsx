import Link from "next/link";
import {
  Shield,
  Search,
  AlertTriangle,
  Key,
  Lock,
  Eye,
  Fingerprint,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Search,
    title: "Password Strength Checker",
    description:
      "Real-time entropy analysis with brute-force time estimation and weakness detection.",
    href: "/strength-checker",
    gradient: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/20",
  },
  {
    icon: AlertTriangle,
    title: "Data Breach Identifier",
    description:
      "Check passwords and emails against curated offline breach datasets using SHA-256 hashing.",
    href: "/breach-check",
    gradient: "from-orange-500 to-red-500",
    shadow: "shadow-orange-500/20",
  },
  {
    icon: Key,
    title: "Password Generator",
    description:
      "Cryptographically secure password and passphrase generation with customizable policies.",
    href: "/generator",
    gradient: "from-violet-500 to-purple-500",
    shadow: "shadow-violet-500/20",
  },
];

const securityBadges = [
  { icon: Lock, label: "Zero Password Storage" },
  { icon: Eye, label: "Client-Side Only" },
  { icon: Fingerprint, label: "Zero-Knowledge" },
  { icon: Shield, label: "Open Source" },
];

export default function HomePage() {
  return (
    <div className="relative page-transition">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      {/* Hero gradient orbs */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="absolute top-20 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-20 pb-16 md:pt-32 md:pb-24 md:px-6">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400 mb-8">
              <Shield className="h-3.5 w-3.5" />
              <span>Privacy-First Security Toolkit</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Your Passwords</span>
              <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Deserve Better
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Evaluate password strength, check breach exposure, and generate
              secure passwords — all without compromising your privacy.{" "}
              <span className="text-foreground font-medium">
                Zero data transmission. Zero storage.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-emerald-500/25 h-12 px-8 text-base"
              >
                <Link href="/strength-checker">
                  Check Your Password
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base border-border/60"
              >
                <Link href="/generator">Generate Secure Password</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Complete Security Suite
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Three powerful tools to help you assess, identify, and improve
              your password security.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
            {features.map((feature) => (
              <Link key={feature.href} href={feature.href} className="group">
                <Card className="relative h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-xl hover:-translate-y-1">
                  {/* Top gradient line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.gradient} opacity-0 transition-opacity group-hover:opacity-100`}
                  />
                  <CardHeader>
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} ${feature.shadow} shadow-lg mb-3`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm font-medium text-emerald-400 group-hover:gap-2 transition-all">
                      Explore
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Security Guarantees */}
        <section className="container mx-auto px-4 py-16 md:px-6">
          <div className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-8 md:p-12 max-w-5xl mx-auto glow-emerald">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Privacy & Security Guarantees
              </h2>
              <p className="mt-2 text-muted-foreground">
                Built with a zero-knowledge architecture from the ground up.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {securityBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-3 rounded-xl border border-border/40 bg-background/50 p-4 transition-colors hover:bg-background/80"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                    <badge.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium">{badge.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 text-center">
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>All processing happens in your browser</span>
              </div>
              <p className="text-xs text-muted-foreground max-w-lg">
                No passwords are ever stored, transmitted, or logged. Our
                offline breach dataset is pre-downloaded — zero network requests
                involve your sensitive data.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
