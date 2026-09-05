import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, MapPin, ShieldCheck } from "lucide-react";
import { services, inr, testimonials } from "@/lib/data";
import { Rating, Badge } from "@/components/site/ui-bits";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service not found — Paw Brothers" }, { name: "robots", content: "noindex" }] };
    }
    const s = loaderData.service;
    return {
      meta: [
        { title: `${s.name} in Pune — Paw Brothers` },
        { name: "description", content: s.description.slice(0, 155) },
        { property: "og:title", content: `${s.name} — ${s.tagline}` },
        { property: "og:description", content: s.description.slice(0, 155) },
      ],
    };
  },
  component: ServiceDetail,
});

const tabs = ["Overview", "Facilities", "What's Included", "Reviews", "FAQs"] as const;

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");

  return (
    <div className="pb-8">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={service.image}
            alt={service.name}
            className="h-[280px] w-full object-cover sm:h-[420px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-background sm:p-10">
            <Badge tone="cream" className="bg-background/90">
              {service.emoji} {service.name}
            </Badge>
            <h1 className="mt-4 max-w-2xl text-3xl font-bold sm:text-5xl">{service.tagline}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <Rating value={service.rating} count={service.reviews} className="text-background" />
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" /> Pune
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  tab === t
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground/70 hover:bg-muted"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border sm:p-8">
            {tab === "Overview" && (
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-foreground/80">{service.description}</p>
                <div className="grid gap-4 pt-4 sm:grid-cols-3">
                  {[
                    ["Verified caretakers", "Background-checked, trained, insured."],
                    ["Vet on call", "A licensed vet reachable 24×7."],
                    ["Daily updates", "Photos and notes, every single day."],
                  ].map(([t, d]) => (
                    <div key={t} className="rounded-2xl bg-secondary p-5">
                      <ShieldCheck className="size-5 text-primary" />
                      <p className="mt-3 font-semibold">{t}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(tab === "Facilities" || tab === "What's Included") && (
              <ul className="grid gap-3 sm:grid-cols-2">
                {(tab === "Facilities" ? service.facilities : service.included).map((f) => (
                  <li key={f} className="flex items-start gap-3 rounded-2xl bg-secondary p-4">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-sm leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            )}

            {tab === "Reviews" && (
              <div className="space-y-5">
                {testimonials.map((t) => (
                  <div key={t.name} className="flex gap-4 rounded-2xl bg-secondary p-5">
                    <img
                      src={t.avatar}
                      alt=""
                      loading="lazy"
                      className="size-12 shrink-0 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.dog}</p>
                      <Rating value={t.rating} className="mt-2" />
                      <p className="mt-2 text-sm leading-relaxed text-foreground/80">{t.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "FAQs" && (
              <div className="divide-y divide-border">
                {service.faqs.map((f) => (
                  <div key={f.q} className="py-5 first:pt-0 last:pb-0">
                    <p className="font-semibold">{f.q}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl bg-card p-6 shadow-lift ring-1 ring-border">
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="mt-1 text-3xl font-bold">
              {inr(service.price)}
              <span className="text-base font-medium text-muted-foreground"> / {service.priceUnit}</span>
            </p>
            <Rating value={service.rating} count={service.reviews} className="mt-3" />
            <Link
              to="/book"
              search={{ service: service.slug }}
              className="mt-6 block rounded-2xl bg-primary py-4 text-center font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Check Availability
            </Link>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Free cancellation up to 48 hours before
            </p>
          </div>
          <div className="mt-4 hidden rounded-3xl bg-primary-soft p-5 text-sm leading-relaxed text-primary lg:block">
            Not sure which service fits? Tell us about your dog and we'll suggest a plan — no
            pressure, no charge.
          </div>
        </aside>
      </div>

      <div className="sticky bottom-16 z-40 mt-8 px-4 lg:hidden">
        <Link
          to="/book"
          search={{ service: service.slug }}
          className="flex items-center justify-between rounded-2xl bg-primary px-5 py-4 text-primary-foreground shadow-lift"
        >
          <span className="text-sm">
            From <strong>{inr(service.price)}</strong>/{service.priceUnit}
          </span>
          <span className="font-semibold">Check Availability</span>
        </Link>
      </div>
    </div>
  );
}
