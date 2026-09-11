import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { img } from "@/data/images";
import {
  brand,
  dayTimeline,
  dogs,
  faqs,
  foundingMemberOffer,
  journeyCards,
  safetyPoints,
  services,
  startingPrices,
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
import { Reveal } from "@/components/Reveal";
import { StickyBookBar } from "@/components/StickyBookBar";

const title = "Paw Brothers — Dog boarding, daycare & training in Pune";
const description =
  "Boarding, daycare, training, grooming, in-house vet care and fresh food for dogs in Pune. Run by dog parents, watched over by our own two dogs.";

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
          email: "pawbrothers24@gmail.com",
          telephone: "+919535702274",
        }),
      },
    ],
  }),
  component: HomePage,
});

const heroStats = [
  { value: "8+", label: "Years living with dogs" },
  { value: "2", label: "Our own dogs, living here" },
  { value: "1", label: "Vet in the family, on call" },
  { value: "0", label: "Cages in the house" },
];

function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="warm-glow relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pb-24 lg:pt-16">
          <div className="reveal">
            <Badge tone="accent">{brand.status}</Badge>
            <h1 className="mt-5 whitespace-nowrap font-display text-3xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Because they&apos;re <span className="text-primary">family</span>.
            </h1>
            <p className="mt-3 font-display text-xl font-bold text-primary sm:text-2xl">
              Built by dog parents, for dog parents.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Boarding, daycare, training, grooming, in-house vet care and fresh food in Pune —
              from people whose own two dogs sleep in the same rooms yours will.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/contact">
                Book a Free Visit <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink to="/services" variant="outline">
                Explore Paw Brothers
              </ButtonLink>
              <ButtonLink to="/my-pets" variant="outline">
                Create your dog&apos;s profile
              </ButtonLink>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm sm:gap-6">
              <div className="flex -space-x-3">
                {[img.brothersAtHome, img.goofyParent, img.brunoSit, img.family].map((p) => (
                  <img
                    key={p}
                    src={p}
                    alt=""
                    width={80}
                    height={80}
                    loading="lazy"
                    className="size-10 rounded-full border-2 border-card object-cover"
                  />
                ))}
              </div>
              <div>
                <p className="font-display text-sm font-bold">Built by dog parents in Pune</p>
                <p className="text-xs text-muted-foreground">
                  Opening soon — come see it before you decide anything.
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] shadow-lift">
              <img
                src={img.heroRun}
                alt="Bruno and Goofy running together in the garden"
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

      {/* 2. Trust strip */}
      <div className="border-b border-border bg-secondary/50">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {trustStrip.map((t) => (
            <div key={t.title} className="flex items-center gap-3">
              <span className="text-2xl">{t.emoji}</span>
              <span className="font-display font-semibold">{t.title}</span>
            </div>
          ))}
        </div>
      </div>

      <Section className="py-10 lg:py-12">
        <Reveal>
          <div className="grid gap-6 rounded-[2rem] border border-border bg-card p-8 text-center shadow-soft sm:grid-cols-2 lg:grid-cols-4">
            {heroStats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl font-extrabold text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* 3b. Quick service finder */}
      <Section className="pt-0">
        <Reveal>
          <SectionHeading
            eyebrow="Start here"
            title="What does your dog need today?"
            sub="Pick one and we'll take it from there — no forms, no waiting."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {services.slice(0, 6).map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <Link
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                to={`/${s.slug}` as any}
                className="flex h-full flex-col items-center gap-2 rounded-3xl border border-border bg-card px-4 py-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-2xl">
                  {s.emoji}
                </span>
                <span className="font-display text-sm font-bold">{s.name}</span>
                {s.status !== "available" ? (
                  <ServiceStatusBadge status={s.status} />
                ) : startingPrices[s.slug] ? (
                  <span className="text-xs text-muted-foreground">{startingPrices[s.slug]}</span>
                ) : null}
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4. Why Paw Brothers */}
      <Section>
        <SectionHeading
          eyebrow="Why Paw Brothers"
          title="More than a place to stay."
          sub="One simple belief runs through everything here: caring for a dog should feel personal, responsible and completely trustworthy."
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
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {s.ctaLabel} <ArrowRight className="size-4" />
                  </p>
                  {startingPrices[s.slug] ? (
                    <span className="font-display text-sm font-bold">{startingPrices[s.slug]}</span>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* 5b. Safety */}
      <Section className="pt-0">
        <SectionHeading
          eyebrow="Safety"
          title="How we keep your dog safe."
          sub="The questions every dog parent asks before handing over the leash — answered plainly."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {safetyPoints.map((p) => (
            <Card key={p.title} hover className="p-7">
              <span className="text-2xl">{p.emoji}</span>
              <h3 className="mt-3 font-display text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </Card>
          ))}
        </div>
        <Card className="mt-8 border-primary/20 bg-secondary/60 p-8 text-center">
          <p className="mx-auto max-w-3xl font-display text-xl font-bold leading-relaxed sm:text-2xl">
            “Your dog plays with <span className="text-primary">our</span> dogs, eats in our kitchen
            and sleeps where Bruno and Goofy sleep. That's how sure we are about the care here.”
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Bipin &amp; Shalini · Owners</p>
        </Card>
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
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Card className="overflow-hidden">
                <img
                  src={img.goofyTree}
                  alt="Goofy the Golden Retriever sitting outdoors"
                  width={900}
                  height={700}
                  loading="lazy"
                  className="aspect-[5/4] w-full object-cover"
                />
                <p className="p-4 font-display font-bold">Goofy</p>
              </Card>
              <Card className="overflow-hidden">
                <img
                  src={img.brunoSit}
                  alt="Bruno the German Shepherd relaxing at home"
                  width={900}
                  height={700}
                  loading="lazy"
                  className="aspect-[5/4] w-full object-cover"
                />
                <p className="p-4 font-display font-bold">Bruno</p>
              </Card>
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
                Your dog's health passport
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                Every dog gets a Paw Profile.
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-primary-foreground/75">
                Vaccination records, health history, feeding instructions, training progress and
                every stay — kept in one place, so any vet or caregiver has the full picture
                instantly, not a story you have to retell from memory.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink to="/my-pets" variant="light">
                  Create your Paw Profile
                </ButtonLink>
                <ButtonLink to="/dogs" variant="light" className="bg-transparent text-primary-foreground ring-1 ring-primary-foreground/30 hover:bg-primary-foreground/10">
                  See a demo
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
          {dogs.map((d) => (
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
            <Badge tone="sage">In-house, from day one</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              A vet in the family, and in the building.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Dr. Sonal Dixit is our resident veterinarian — and the founder's sister. A qualified
              vet with postgraduate veterinary education, currently pursuing a PhD in Veterinary
              Surgery, she reviews every dog's health, food and medication herself. Nothing is
              guessed at, and nobody waits for an appointment.
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

      {/* 10. Our home in Pune */}
      <Section className="pt-0">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img
            src={img.heroPlay}
            alt="Dogs playing in the secure garden at the Paw Brothers home in Pune"
            width={900}
            height={700}
            loading="lazy"
            className="aspect-[5/4] w-full rounded-[2rem] object-cover shadow-soft"
          />
          <div>
            <Badge tone="cream">Opening soon in Pune</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              A home with a garden, not a row of cages.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              This is where Bruno and Goofy grew up. Boarding rooms with real beds, a secure garden,
              a quiet grooming corner and a vet down the hall. Come see it before you decide anything
              — we'd rather show you than ask you to trust us.
            </p>
            <ButtonLink to="/facility" className="mt-6">
              Take a look around
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* 10b. Founding families */}
      <Section className="pt-0">
        <Card className="border-primary/20 bg-secondary/60 p-8 text-center lg:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground/70">
            Founding families
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
            Be one of the first dogs at Paw Brothers.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
            {foundingMemberOffer
              ? `As a founding family, you'll get ${foundingMemberOffer}.`
              : "We're welcoming a small number of founding families before we open to everyone else. Join the list and we'll reach out personally."}
          </p>
          <ButtonLink to="/contact" className="mt-6">
            Join the founding list
          </ButtonLink>
        </Card>
      </Section>

      {/* 11. Waitlist */}
      <Section id="waitlist" className="pt-0">
        <Card className="p-8 lg:p-12">
          <SectionHeading
            eyebrow="Free visit"
            title="Bring your dog. Have a look. Then decide."
            sub="Tell us a little about them and we'll set up a visit — no booking, no commitment."
          />
          <div className="mt-10">
            <WaitlistForm />
          </div>
        </Card>
      </Section>

      {/* 12b. FAQs */}
      <Section className="pt-0">
        <SectionHeading
          eyebrow="Good to know"
          title="Questions dog parents ask us."
          sub="Anything else, just call — we pick up ourselves."
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow open:shadow-lift"
            >
              <summary className="cursor-pointer list-none font-display text-lg font-bold marker:hidden">
                <span className="flex items-start justify-between gap-4">
                  {f.q}
                  <span className="mt-1 shrink-0 text-primary transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
        <Card className="mx-auto mt-8 grid max-w-4xl gap-4 p-7 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Bipin · Owner</p>
            <a href="tel:+919535702274" className="font-display text-lg font-bold hover:text-primary">9535702274</a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Shalini · Owner</p>
            <a href="tel:+917499930533" className="font-display text-lg font-bold hover:text-primary">7499930533</a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Dr. Sonal Dixit · Vet</p>
            <a href="tel:+919111821045" className="font-display text-lg font-bold hover:text-primary">9111821045</a>
          </div>
          <p className="sm:col-span-3 text-sm text-muted-foreground">
            Or email{" "}
            <a href="mailto:pawbrothers24@gmail.com" className="font-semibold text-primary">
              pawbrothers24@gmail.com
            </a>{" "}
            — we reply the same day.
          </p>
        </Card>
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
              Book a Free Visit
            </ButtonLink>
            <a
              href="https://wa.me/919535702274?text=Hi%20Paw%20Brothers%2C%20I%20would%20like%20to%20know%20more%20about%20your%20dog-care%20services."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-transparent px-6 py-3 text-sm font-semibold text-primary-foreground ring-1 ring-primary-foreground/30 transition-all duration-200 hover:bg-primary-foreground/10"
            >
              Talk to Us
            </a>
          </div>
        </div>
      </Section>

      <StickyBookBar />
    </>
  );
}
