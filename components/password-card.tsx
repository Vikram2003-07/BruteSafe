"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface PasswordCardProps {
  password: string;
  onRegenerate?: () => void;
  className?: string;
}

export function PasswordCard({
  password,
  onRegenerate,
  className,
}: PasswordCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      toast.success("Password copied! Clipboard will be cleared in 30s.", {
        duration: 3000,
      });
      // Auto-clear clipboard after 30s for security
      setTimeout(() => {
        navigator.clipboard.writeText("").catch(() => {});
      }, 30000);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Card
      className={cn(
        "border-border/50 bg-card/50 backdrop-blur-sm glow-emerald",
        className,
      )}
    >
      <CardContent className="flex items-center gap-3 p-4">
        {/* Password display */}
        <div className="flex-1 overflow-hidden">
          <p className="font-mono text-lg md:text-xl tracking-wider select-all break-all leading-relaxed">
            {password.split("").map((char, i) => {
              let color = "text-foreground";
              if (/[A-Z]/.test(char)) color = "text-cyan-400";
              if (/[0-9]/.test(char)) color = "text-amber-400";
              if (/[^a-zA-Z0-9]/.test(char)) color = "text-rose-400";
              return (
                <span key={i} className={color}>
                  {char}
                </span>
              );
            })}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          {onRegenerate && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={onRegenerate}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
