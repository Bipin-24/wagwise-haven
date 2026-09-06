import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { img } from "@/data/images";
import {
  brand,
  dayTimeline,
  dogs,
  journeyCards,
  sampleReviews,
  services,
  trustStrip,
  whyCards,
} from "@/data/mock";
import {
  Badge,
  ButtonLink,
  Card,
  PageHero,
  Section,
  SectionHeading,
  ServiceStatusBadge,
  Timeline,
} from "@/components/ui-kit";
import { WaitlistForm } from "@/components/WaitlistForm";

const title = "Paw Brothers — Dog boarding, daycare & training in Pune";
const description =
  "Built by dog parents, for dog parents. Thoughtful boarding, daycare, training, grooming and wellness for dogs in Pune. Coming soon.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Paw Brothers",
          description,
          areaServed: "Pune, Maharashtra, India",
          slogan: "Built by dog parents, for dog parents.",
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [bruno, goofy] = dogs;

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pb-24 lg:pt-16">
          <div className="reveal">
            <Badge tone="accent">{brand.status}</Badge>
            <h1 className="mt-5 text-balance font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Built by dog parents, for dog parents.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Thoughtful boarding, daycare, training, wellness and care for dogs in Pune — created
              by people who know that dogs are family.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/services">
                Explore Paw Brothers <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink to="/bruno" variant="outline">
                Meet Bruno &amp; Goofy
              </ButtonLink>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] shadow-lift">
              <img
                src={img.brothers}
                alt="Bruno the German Shepherd and Goofy the Golden Retriever together"
                width={960}
                height={1280}
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/4]"
              />
            </div>
            <div className="absolute -bottom-5 left-4 hidden rounded-2xl bg-card px-5 py-3 shadow-lift sm:block">
              <p className="font-display text-sm font-bold">Bruno &amp; Goofy</p>
              <p className="text-xs text-muted-foreground">The Paw Brothers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trust strip */}
      <div className="border-y border-border bg-secondary/50">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {trustStrip.map((t) => (
            <div key={t.title} className="flex items-center gap-3">
              <span className="text-2xl">{t.emoji}</span>
              <span className="font-display font-semibold">{t.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Why Paw Brothers */}
      <Section>
        <SectionHeading
          eyebrow="Why Paw Brothers"
          title="More than a place to stay."
          sub="Paw Brothers is being built around one simple belief: caring for a dog should feel personal, responsible and trustworthy."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyCards.map((c) => (
            <Card key={c.title} hover className="p-7">
              <h3 className="font-display text-xl font-bold">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 5. Services */}
      <Section className="pt-0">
        <SectionHeading
          eyebrow="Services"
          title="Everything your dog needs. One trusted place."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              to={`/${s.slug}` as any}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="overflow-hidden">
                <img
                  src={s.cardImage}
                  alt={s.name}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-bold">
                    {s.emoji} {s.name}
                  </h3>
                  <ServiceStatusBadge status={s.status} />
                </div>
                <p className="mt-2 font-medium">{s.tagline}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {s.ctaLabel} <ArrowRight className="size-4" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* 6. A day at Paw Brothers */}
      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="A day at Paw Brothers"
              title="A day filled with care."
              sub="Structure, rest and attention — the rhythm we plan every stay around."
            />
            <div className="mt-8 overflow-hidden rounded-[2rem] shadow-soft">
              <img
                src={img.goofyTree}
                alt="Goofy the Golden Retriever sitting outdoors"
                width={900}
                height={700}
                loading="lazy"
                className="aspect-[5/4] w-full object-cover"
              />
            </div>
          </div>
          <Card className="p-8">
            <Timeline items={dayTimeline} />
          </Card>
        </div>
      </Section>

      {/* 7. Paw Profile */}
      <Section className="pt-0">
        <div className="overflow-hidden rounded-[2.5rem] bg-primary text-primary-foreground">
          <div className="grid items-center gap-10 p-8 lg:grid-cols-2 lg:p-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60">
                Digital care
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                Every dog gets a Paw Profile.
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-primary-foreground/75">
                Health records, feeding instructions, training progress, grooming and booking
                history — all in one simple place, shared between you and us.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink to="/dogs" variant="light">
                  See a Paw Profile
                </ButtonLink>
                <ButtonLink to="/updates" variant="light" className="bg-transparent text-primary-foreground ring-1 ring-primary-foreground/30 hover:bg-primary-foreground/10">
                  Paw Updates
                </ButtonLink>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Overview", "Health", "Nutrition", "Training", "Grooming", "Bookings"].map((t) => (
                <div
                  key={t}
                  className="rounded-2xl bg-primary-foreground/10 px-5 py-4 text-sm font-semibold"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 8. Meet Bruno & Goofy */}
      <Section className="pt-0">
        <SectionHeading
          eyebrow="The Paw Brothers"
          title="Meet the Paw Brothers."
          sub="Two dogs. Two personalities. One big reason we started."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {[bruno, goofy].map((d) => (
            <Card key={d.id} hover className="overflow-hidden">
              <img
                src={d.photo}
                alt={`${d.name}, ${d.breed}`}
                width={1000}
                height={1000}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              <div className="p-7">
                <p className="text-sm font-semibold text-muted-foreground">{d.breed}</p>
                <h3 className="mt-1 font-display text-3xl font-extrabold">{d.name}</h3>
                <Badge tone="accent" className="mt-2">
                  {d.persona}
                </Badge>
                <p className="mt-4 leading-relaxed text-muted-foreground">{d.about}</p>
                <ButtonLink to={`/${d.slug}`} className="mt-6">
                  Meet {d.name}
                </ButtonLink>
              </div>
            </Card>
          ))}
        </div>

        <h3 className="mt-16 text-center font-display text-2xl font-bold">Follow their journey</h3>
        <div className="no-scrollbar mt-6 flex snap-x gap-4 overflow-x-auto pb-2">
          {journeyCards.map((j) => (
            <div
              key={j.title}
              className="w-64 shrink-0 snap-start overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
            >
              <img
                src={j.photo}
                alt={j.title}
                width={600}
                height={600}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              <div className="p-5">
                <p className="font-display font-bold">{j.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{j.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 9. Veterinary expertise */}
      <Section className="pt-0">
        <Card className="grid items-center gap-8 overflow-hidden p-8 lg:grid-cols-[1.2fr_1fr] lg:p-12">
          <div>
            <Badge tone="accent">Coming Soon</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Veterinary expertise with trust at the center.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Sonal Dixit, our Veterinary Advisor, is a qualified veterinarian with undergraduate
              and postgraduate veterinary education and is currently pursuing a PhD in Veterinary
              Surgery.
            </p>
            <ButtonLink to="/veterinary" className="mt-6">
              Learn more
            </ButtonLink>
          </div>
          <img
            src={img.vet}
            alt="Veterinary care for dogs"
            width={800}
            height={600}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-3xl object-cover"
          />
        </Card>
      </Section>

      {/* 10. Facility coming soon */}
      <Section className="pt-0">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img
            src={img.boarding}
            alt="A calm indoor space for dogs"
            width={900}
            height={700}
            loading="lazy"
            className="aspect-[5/4] w-full rounded-[2rem] object-cover shadow-soft"
          />
          <div>
            <Badge tone="cream">Planned · Pune</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              We're building a place dogs will love coming home to.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Paw Brothers is currently working toward establishing a dedicated dog-care facility in
              Pune.
            </p>
            <ButtonLink to="/facility" className="mt-6">
              See what's planned
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* 11. Waitlist */}
      <Section id="waitlist" className="pt-0">
        <Card className="p-8 lg:p-12">
          <SectionHeading
            eyebrow="Waitlist"
            title="Be part of the Paw Brothers journey."
            sub="Tell us about your dog and we'll keep you posted as we open."
          />
          <div className="mt-10">
            <WaitlistForm />
          </div>
        </Card>
      </Section>

      {/* 12. Sample testimonials */}
      <Section className="pt-0">
        <SectionHeading eyebrow="Sample testimonials" title="What we hope you'll say." />
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
          These are sample testimonials written to illustrate the experience — not real customer
          reviews.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {sampleReviews.map((r) => (
            <Card key={r.id} className="p-7">
              <Badge tone="cream">Sample testimonial</Badge>
              <p className="mt-4 font-display text-lg leading-relaxed">“{r.quote}”</p>
              <p className="mt-4 text-sm text-muted-foreground">{r.context}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 13. Final CTA */}
      <Section className="pt-0">
        <div className="rounded-[2.5rem] bg-primary px-8 py-14 text-center text-primary-foreground lg:px-16 lg:py-20">
          <h2 className="text-balance font-display text-3xl font-extrabold sm:text-4xl">
            Your dog deserves more than a place to stay.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-primary-foreground/75">
            They deserve care, attention, trust and a second home.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/contact" variant="light">
              Join Paw Brothers
            </ButtonLink>
            <ButtonLink
              to="/goofy"
              variant="light"
              className="bg-transparent text-primary-foreground ring-1 ring-primary-foreground/30 hover:bg-primary-foreground/10"
            >
              Meet Bruno &amp; Goofy
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
