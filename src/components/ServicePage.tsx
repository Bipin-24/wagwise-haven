import type { ReactNode } from "react";
import { Card, PageHero, Section, SectionHeading, ButtonLink, ServiceStatusBadge, Badge } from "@/components/ui-kit";
import { getPricing, getService } from "@/services/api";
import { inr } from "@/data/mock";

export function ServicePage({
  slug,
  heroTitle,
  heroCopy,
  children,
}: {
  slug: string;
  heroTitle: string;
  heroCopy: string;
  children?: ReactNode;
}) {
  const service = getService(slug);
  const plans = getPricing(slug);
  if (!service) return null;

  return (
    <>
      <PageHero
        eyebrow={`${service.emoji} ${service.name}`}
        title={heroTitle}
        sub={heroCopy}
        image={service.heroImage}
      >
        <ButtonLink to="/book">Start a booking</ButtonLink>
        <ButtonLink to="/facility" variant="outline">
          See the planned facility
        </ButtonLink>
        <span className="inline-flex items-center">
          <ServiceStatusBadge status={service.status} />
        </span>
      </PageHero>

      <Section>
        <SectionHeading
          align="left"
          eyebrow="What's included"
          title={service.tagline}
          sub={service.description}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.features.map((f) => (
            <Card key={f} hover className="flex items-start gap-3 p-6">
              <span className="mt-0.5 text-lg">🐾</span>
              <span className="font-medium">{f}</span>
            </Card>
          ))}
        </div>
      </Section>

      {children}

      {plans.length > 0 && (
        <Section className="pt-0">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple, transparent plans"
            sub="Demo pricing — final pricing coming soon."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <Card
                key={p.id}
                hover
                className={`p-7 ${p.highlighted ? "ring-2 ring-primary" : ""}`}
              >
                {p.highlighted && <Badge tone="accent">Most popular</Badge>}
                <h3 className="mt-3 font-display text-xl font-bold">{p.name}</h3>
                <p className="mt-3 font-display text-3xl font-extrabold">
                  {inr(p.price)}
                  <span className="text-base font-medium text-muted-foreground"> / {p.unit}</span>
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground/80">
                  {p.note}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {p.includes.map((i) => (
                    <li key={i}>✓ {i}</li>
                  ))}
                </ul>
                <ButtonLink to="/book" className="mt-6 w-full">
                  Request this plan
                </ButtonLink>
              </Card>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
