import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin, Dog, Star, Check } from "lucide-react";
import {
  img,
  services,
  trainingPrograms,
  vets,
  products,
  foodCategories,
  testimonials,
  stats,
  inr,
} from "@/lib/data";
import { Rating, Badge, SectionHeading, ServiceIcon } from "@/components/site/ui-bits";
import { useState } from "react";

const DESC =
  "Trusted dog boarding, training, online vet consults, grooming, walking and fresh natural food in Pune. Because they're family.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Paw Brothers — Premium Dog Care in Pune" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Because They're Family — Paw Brothers Pune" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Paw Brothers",
          description: DESC,
          areaServed: "Pune, Maharashtra, India",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "2400" },
        }),
      },
    ],
  }),
});

function Index() {
  const [category, setCategory] = useState("Adult");

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-8 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pb-24 lg:pt-14">
          <div className="reveal">
            <Badge tone="accent">
              <Star className="size-3.5 fill-accent text-accent" />
              Trusted by happy dogs &amp; their humans in Pune
            </Badge>
            <h1 className="mt-6 text-pretty text-4xl font-extrabold leading-[1.05] sm:text-6xl">
              Because They're{" "}
              <span className="relative inline-block text-primary">
                Family.
                <span className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-accent-soft" />
              </span>
            </h1>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
              Trusted care, training, wellness and everything your dog needs — all in one place.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/book"
                className="rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.03]"
              >
                Book a Service
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-4 font-semibold transition-colors hover:bg-muted"
              >
                Explore Services <ArrowRight className="size-4" />
              </Link>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <dt className="text-2xl font-bold">{s.value}</dt>
                  <dd className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-lift">
              <img
                src={img.hero}
                alt="A happy golden retriever running across a sunlit garden lawn in Pune"
                width={1600}
                height={1200}
                className="aspect-[5/4] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-4 hidden items-center gap-3 rounded-2xl bg-card p-4 shadow-lift ring-1 ring-border sm:flex">
              <img src={img.play} alt="" className="size-12 rounded-xl object-cover" />
              <div>
                <p className="text-sm font-semibold">Bruno is boarding tonight</p>
                <p className="text-xs text-muted-foreground">Photo update sent · 7:42 pm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK SERVICE FINDER */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">What does your dog need today?</h2>
        <div className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-6 lg:px-0">
          {services.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group w-[68%] shrink-0 snap-start rounded-3xl bg-card p-5 shadow-soft ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:w-[38%] lg:w-auto"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <ServiceIcon slug={s.slug} />
              </span>
              <p className="mt-4 font-bold">{s.name}</p>
              <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{s.tagline}</p>
              <ArrowUpRight className="mt-4 size-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED SERVICES — asymmetric */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <SectionHeading
          align="left"
          eyebrow="Featured"
          title="Everything Your Dog Needs"
          sub="One team, one standard of care — whether it's a two-week stay or a Tuesday walk."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <FeatureCard service={services[0]!} large />
          <div className="grid gap-6">
            <FeatureCard service={services[1]!} />
            <FeatureCard service={services[2]!} />
          </div>
          <div className="grid gap-6">
            <FeatureCard service={services[3]!} />
            <FeatureCard service={services[4]!} />
          </div>
        </div>
      </section>

      {/* BOARDING EXPERIENCE */}
      <section className="bg-secondary/70 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge><ServiceIcon slug="boarding" className="size-3.5" /> Boarding</Badge>
              <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                A second home when you're away.
              </h2>
              <p className="mt-4 max-w-[46ch] leading-relaxed text-muted-foreground">
                Sofas instead of cages. A fenced garden instead of a concrete run. Live-in
                caretakers, six dogs maximum, and an evening photo so you can breathe easy.
              </p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {["Comfortable sleeping rooms", "Open garden play areas", "Live-in caretakers", "Daily photo updates"].map(
                  (f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <span className="grid size-5 place-items-center rounded-full bg-primary-soft text-primary">
                        <Check className="size-3" />
                      </span>
                      {f}
                    </li>
                  ),
                )}
              </ul>
              <div className="mt-9 grid grid-cols-3 gap-3">
                {[img.boarding, img.play, img.run].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Dogs relaxing and playing at Paw Brothers boarding"
                    loading="lazy"
                    className="aspect-square w-full rounded-2xl object-cover"
                  />
                ))}
              </div>
            </div>

            {/* mini booking widget */}
            <div className="rounded-3xl bg-card p-6 shadow-lift ring-1 ring-border sm:p-8">
              <p className="font-display text-lg font-bold">Check availability</p>
              <div className="mt-6 space-y-4">
                <Field label="Location" icon={<MapPin className="size-4 text-primary" />} value="Pune" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Check-in" icon={<CalendarDays className="size-4 text-primary" />} value="Select date" muted />
                  <Field label="Check-out" icon={<CalendarDays className="size-4 text-primary" />} value="Select date" muted />
                </div>
                <Field label="Dog" icon={<Dog className="size-4 text-primary" />} value="1 Dog" />
              </div>
              <Link
                to="/book"
                search={{ service: "boarding" }}
                className="mt-7 block rounded-2xl bg-primary py-4 text-center font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Find a Stay
              </Link>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Free cancellation up to 48 hours before check-in
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRAINING */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="overflow-hidden rounded-3xl shadow-soft">
            <img
              src={img.training}
              alt="A trainer working with an attentive German Shepherd on a lawn"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div>
            <Badge><ServiceIcon slug="training" className="size-3.5" /> Training</Badge>
            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
              Better training. Happier dogs.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Reward-based programmes built around your dog — and coached to you, so the progress
              sticks at home.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {trainingPrograms.map((p) => (
                <div
                  key={p.name}
                  className="rounded-2xl bg-card p-5 shadow-soft ring-1 ring-border transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-bold">{p.name}</p>
                    <span className="text-xs text-muted-foreground">{p.weeks}</span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-primary">{p.for}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ONLINE VET */}
      <section className="bg-primary py-16 text-primary-foreground lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/60">
              Online vet
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Expert care, whenever you need it.
            </h2>
            <p className="mt-4 text-primary-foreground/75">
              Licensed veterinarians on video, same day, 8am to 11pm. Digital prescription and a
              written care plan after every consult.
            </p>
          </div>
          <div className="no-scrollbar -mx-4 mt-10 flex snap-x gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-4">
            {vets.map((v) => (
              <div
                key={v.name}
                className="w-[76%] shrink-0 snap-start rounded-3xl bg-background p-6 text-foreground shadow-soft sm:w-auto"
              >
                <div className="flex items-center justify-between">
                  <img src={img.vet} alt="" loading="lazy" className="size-14 rounded-full object-cover" />
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      v.online ? "bg-primary-soft text-primary" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <span className={`size-1.5 rounded-full ${v.online ? "bg-primary" : "bg-muted-foreground"}`} />
                    {v.online ? "Available now" : "Tomorrow"}
                  </span>
                </div>
                <p className="mt-4 font-bold">{v.name}</p>
                <p className="text-sm text-muted-foreground">{v.role}</p>
                <p className="mt-2 text-sm">{v.spec}</p>
                <div className="mt-3 flex items-center justify-between">
                  <Rating value={v.rating} />
                  <span className="text-xs text-muted-foreground">{v.years} years</span>
                </div>
                <Link
                  to="/book"
                  search={{ service: "vet" }}
                  className="mt-5 block rounded-xl bg-primary py-3 text-center text-sm font-semibold text-primary-foreground"
                >
                  Consult a Vet
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NATURAL FOOD */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          align="left"
          eyebrow="Natural food"
          title="Good food. Better life."
          sub="Fresh, preservative-free meals cooked in small batches and delivered across Pune."
        />
        <div className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {foodCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                category === c ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article
              key={p.name}
              className={`group overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                p.category === category ? "ring-2 ring-primary/30" : ""
              }`}
            >
              <div className="aspect-square overflow-hidden bg-secondary">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <Badge tone="cream">{p.category}</Badge>
                <h3 className="mt-3 font-bold">{p.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold">{inr(p.price)}</span>
                  <Rating value={p.rating} />
                </div>
                <button className="mt-5 w-full rounded-2xl bg-secondary py-3 text-sm font-semibold transition-colors hover:bg-primary hover:text-primary-foreground">
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-secondary/70 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Testimonials" title="Loved by dogs. Trusted by humans." />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border">
                <img src={t.dogPhoto} alt={t.dog} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                <div className="p-7">
                  <Rating value={t.rating} />
                  <blockquote className="mt-4 text-[15px] leading-relaxed text-foreground/85">
                    "{t.text}"
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <img src={t.avatar} alt="" loading="lazy" className="size-11 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.dog}</p>
                    </div>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="relative overflow-hidden rounded-[2rem]">
          <img
            src={img.community}
            alt="Dog parents and their dogs gathered in a Pune park"
            loading="lazy"
            className="h-[420px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/50 to-transparent" />
          <div className="absolute inset-y-0 left-0 flex max-w-lg flex-col justify-center p-8 text-background sm:p-14">
            <Badge tone="cream" className="w-fit bg-background/90">
              Community
            </Badge>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              We're building a better world for dogs.
            </h2>
            <p className="mt-4 text-background/85">
              Adoption drives, rescue stories, free training Saturdays and 2,000+ Pune dog parents
              who show up for each other.
            </p>
            <Link
              to="/community"
              className="mt-8 w-fit rounded-full bg-accent px-7 py-3.5 font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
            >
              Join Our Community
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <div className="grid items-center gap-10 rounded-[2rem] bg-secondary/70 p-8 sm:p-14 lg:grid-cols-2">
          <div>
            <Badge>Our story</Badge>
            <h2 className="mt-5 text-pretty text-3xl font-bold leading-tight sm:text-4xl">
              It started with a simple belief: every dog deserves to feel at home.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Paw Brothers began with two dogs of our own — a German Shepherd and a Golden
              Retriever — and the search for somewhere in Pune that felt like home. We couldn't find
              it, so we built it.
            </p>
            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
            >
              Read our story <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={img.ball} alt="" loading="lazy" className="aspect-[3/4] w-full rounded-3xl object-cover shadow-soft" />
            <img src={img.run} alt="" loading="lazy" className="mt-8 aspect-[3/4] w-full rounded-3xl object-cover shadow-soft" />
          </div>
        </div>
      </section>

      {/* mobile sticky CTA */}
      <div className="sticky bottom-16 z-40 px-4 pb-4 lg:hidden">
        <Link
          to="/book"
          className="flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-semibold text-primary-foreground shadow-lift"
        >
          Book a Service <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({ service, large = false }: { service: (typeof services)[number]; large?: boolean }) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className={`group relative overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
        large ? "lg:row-span-2" : ""
      }`}
    >
      <div className={`overflow-hidden ${large ? "aspect-[4/5]" : "aspect-[16/10]"}`}>
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-lg font-bold">{service.name}</h3>
          <Rating value={service.rating} />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.tagline}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-semibold">
            from {inr(service.price)}
            <span className="text-muted-foreground">/{service.priceUnit}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
            View <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function Field({
  label,
  icon,
  value,
  muted,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-input px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className={`mt-1 flex items-center gap-2 text-sm font-medium ${muted ? "text-muted-foreground" : ""}`}>
        {icon} {value}
      </p>
    </div>
  );
}
