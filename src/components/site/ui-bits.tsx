import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Rating({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm", className)}>
      <span className="flex" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            className={cn(
              "size-3.5",
              i < Math.round(value) ? "fill-gold text-gold" : "text-border",
            )}
          />
        ))}
      </span>
      <span className="font-semibold">{value.toFixed(1)}</span>
      {count !== undefined && <span className="text-muted-foreground">({count})</span>}
      <span className="sr-only">{value} out of 5</span>
    </span>
  );
}

export function Badge({
  children,
  tone = "sage",
  className,
}: {
  children: ReactNode;
  tone?: "sage" | "accent" | "cream";
  className?: string;
}) {
  const tones = {
    sage: "bg-primary-soft text-primary",
    accent: "bg-accent-soft text-accent-foreground",
    cream: "bg-secondary text-foreground/70",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "")}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground/70">
          {eyebrow}
        </p>
      )}
      <h2 className="text-pretty text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{sub}</p>}
    </div>
  );
}
