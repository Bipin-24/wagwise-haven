import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { services, inr } from "@/lib/data";
import { Rating, SectionHeading } from "@/components/site/ui-bits";

const DESC =
  "Boarding, training, online vet care, fresh food, grooming and dog walking for Pune's dogs — all from one trusted team.";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Dog Services in Pune — Paw Brothers" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Everything Your Dog Needs — Paw Brothers" },
      { property: "og:description", content: DESC },
    ],
  }),
});

function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
      <SectionHeading
        align="left"
        eyebrow="Our services"
        title="Everything your dog needs, in one place"
        sub={DESC}
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.slug}
            to="/services/$slug"
            params={{ slug: s.slug }}
            className="group overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={s.image}
                alt={s.name}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur">
                {s.emoji} {s.name}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold">{s.tagline}</h3>
                <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <Rating value={s.rating} count={s.reviews} />
                <span className="text-sm font-semibold">
                  from {inr(s.price)}
                  <span className="text-muted-foreground">/{s.priceUnit}</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
