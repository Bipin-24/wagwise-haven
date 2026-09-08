import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades + lifts children into view on scroll using pure CSS scroll-driven
 * animations. In browsers without support, content simply renders normally.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("reveal-on-scroll", className)}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
