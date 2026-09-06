import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/mock";
import { PageHero, Section, ServiceStatusBadge } from "@/components/ui-kit";

const title = "Services — Paw Brothers dog care in Pune";
const description =
  "Boarding, daycare, training, veterinary support, grooming and natural food for dogs in Pune. One trusted place for everything your dog needs.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/services" },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything your dog needs. One trusted place."
        sub="Paw Brothers is being built as a complete dog-care ecosystem for Pune — starting with care, learning and wellness."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              to={`/${s.slug}` as any}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <img
                src={s.cardImage}
                alt={s.name}
                width={800}
                height={600}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-xl font-bold">
                    {s.emoji} {s.name}
                  </h2>
                  <ServiceStatusBadge status={s.status} />
                </div>
                <p className="mt-2 font-medium">{s.tagline}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.features.slice(0, 3).map((f) => (
                    <li key={f} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {s.ctaLabel} <ArrowRight className="size-4" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
