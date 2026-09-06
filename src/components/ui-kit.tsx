import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { BookingStatus, ServiceStatus } from "@/types";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24", className)}>
      {children}
    </section>
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
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground/70">
          {eyebrow}
        </p>
      )}
      <h2 className="text-pretty font-display text-3xl font-bold leading-tight sm:text-4xl">
        {title}
      </h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Card({
  children,
  className,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card shadow-soft",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "sage",
  className,
}: {
  children: ReactNode;
  tone?: "sage" | "accent" | "cream" | "muted";
  className?: string;
}) {
  const tones = {
    sage: "bg-primary-soft text-primary",
    accent: "bg-accent-soft text-accent-foreground",
    cream: "bg-secondary text-foreground/70",
    muted: "bg-muted text-muted-foreground",
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

export function StatusBadge({ status }: { status: BookingStatus }) {
  const map: Record<BookingStatus, string> = {
    confirmed: "bg-primary-soft text-primary",
    pending: "bg-accent-soft text-accent-foreground",
    completed: "bg-secondary text-foreground/70",
    cancelled: "bg-destructive/10 text-destructive",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize",
        map[status],
      )}
    >
      {status}
    </span>
  );
}

export function ServiceStatusBadge({ status }: { status: ServiceStatus }) {
  if (status === "available") return <Badge tone="sage">Available</Badge>;
  if (status === "planned") return <Badge tone="cream">Planned</Badge>;
  return <Badge tone="accent">Coming Soon</Badge>;
}

export function ButtonLink({
  to,
  params,
  children,
  variant = "primary",
  className,
}: {
  to: string;
  params?: Record<string, string>;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "light";
  className?: string;
}) {
  const variants = {
    primary:
      "bg-primary text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
    outline: "border border-input bg-background text-foreground hover:bg-secondary",
    ghost: "text-foreground hover:bg-secondary",
    light: "bg-background/90 text-foreground hover:bg-background",
  };
  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={to as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params={params as any}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Timeline({
  items,
}: {
  items: { time: string; emoji?: string; label: string; detail?: string }[];
}) {
  return (
    <ol className="relative space-y-6 border-l border-border pl-8">
      {items.map((item) => (
        <li key={item.time + item.label} className="relative">
          <span className="absolute -left-[42px] grid size-8 place-items-center rounded-full border border-border bg-card text-sm">
            {item.emoji ?? "•"}
          </span>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {item.time}
          </p>
          <p className="mt-1 font-display text-lg font-semibold">{item.label}</p>
          {item.detail && (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
          )}
        </li>
      ))}
    </ol>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <Card className="grid place-items-center px-6 py-16 text-center">
      <p className="text-3xl">🐾</p>
      <p className="mt-3 font-display text-lg font-semibold">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{body}</p>
    </Card>
  );
}

export function LoadingState() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-24 animate-pulse rounded-3xl bg-muted" />
      ))}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <Card className="px-6 py-10 text-center">
      <p className="font-display text-lg font-semibold">Something went wrong</p>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
    </Card>
  );
}

export function PageHero({
  eyebrow,
  title,
  sub,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-secondary/50">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          {eyebrow && (
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground/70">
              {eyebrow}
            </p>
          )}
          <h1 className="text-balance font-display text-4xl font-bold leading-[1.08] sm:text-5xl">
            {title}
          </h1>
          {sub && (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{sub}</p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {image && (
          <div className="overflow-hidden rounded-[2rem] shadow-lift">
            <img
              src={image}
              alt=""
              width={900}
              height={640}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        )}
      </div>
    </header>
  );
}
