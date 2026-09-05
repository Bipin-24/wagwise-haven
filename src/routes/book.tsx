import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronLeft, PartyPopper } from "lucide-react";
import { z } from "zod";
import { services, inr } from "@/lib/data";
import { cn } from "@/lib/utils";

const DESC = "Pick a service, choose your dates, tell us about your dog — booking takes under a minute.";

export const Route = createFileRoute("/book")({
  validateSearch: z.object({ service: z.string().optional() }),
  component: BookPage,
  head: () => ({
    meta: [
      { title: "Book a Service — Paw Brothers Pune" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Book dog care in Pune — Paw Brothers" },
      { property: "og:description", content: DESC },
    ],
  }),
});

const steps = ["Service", "Dates", "Your Dog", "Review", "Done"];

function BookPage() {
  const { service: preset } = Route.useSearch();
  const [step, setStep] = useState(preset ? 1 : 0);
  const [slug, setSlug] = useState(preset ?? "boarding");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [dog, setDog] = useState({ name: "Bruno", breed: "Golden Retriever", age: "3", notes: "" });

  const service = services.find((s) => s.slug === slug) ?? services[0]!;
  const canNext = step === 1 ? Boolean(from && to) : step === 2 ? Boolean(dog.name && dog.breed) : true;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-16">
      <div className="flex items-center gap-3">
        {step > 0 && step < 4 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="grid size-10 place-items-center rounded-full bg-secondary transition-colors hover:bg-muted"
            aria-label="Back"
          >
            <ChevronLeft className="size-5" />
          </button>
        )}
        <h1 className="text-2xl font-bold sm:text-3xl">
          {step === 4 ? "You're all set" : "Book a service"}
        </h1>
      </div>

      <ol className="mt-8 flex items-center gap-2" aria-label="Progress">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 flex-col gap-2">
            <span
              className={cn(
                "h-1.5 rounded-full transition-colors",
                i <= step ? "bg-primary" : "bg-border",
              )}
            />
            <span
              className={cn(
                "text-[11px] font-medium",
                i <= step ? "text-primary" : "text-muted-foreground",
              )}
            >
              {s}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border sm:p-8">
        {step === 0 && (
          <>
            <h2 className="text-lg font-bold">What does your dog need?</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => setSlug(s.slug)}
                  className={cn(
                    "flex items-center gap-4 rounded-2xl border p-4 text-left transition-all",
                    slug === s.slug
                      ? "border-primary bg-primary-soft"
                      : "border-border hover:bg-secondary",
                  )}
                >
                  <img src={s.image} alt="" loading="lazy" className="size-14 rounded-xl object-cover" />
                  <span>
                    <span className="block font-semibold">{s.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      from {inr(s.price)}/{s.priceUnit}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-lg font-bold">When do you need us?</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium">Check-in</span>
                <input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3.5 text-base"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Check-out</span>
                <input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3.5 text-base"
                />
              </label>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Pick-up and drop within 8 km of Kothrud is included.
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-lg font-bold">Tell us about your dog</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {([
                ["Dog's name", "name", "Bruno"],
                ["Breed", "breed", "Golden Retriever"],
                ["Age (years)", "age", "3"],
              ] as const).map(([label, key, ph]) => (
                <label key={key} className="block">
                  <span className="text-sm font-medium">{label}</span>
                  <input
                    value={dog[key]}
                    placeholder={ph}
                    onChange={(e) => setDog({ ...dog, [key]: e.target.value })}
                    className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3.5 text-base"
                  />
                </label>
              ))}
            </div>
            <label className="mt-4 block">
              <span className="text-sm font-medium">Anything we should know?</span>
              <textarea
                rows={3}
                value={dog.notes}
                placeholder="Allergies, medication, fears, favourite games…"
                onChange={(e) => setDog({ ...dog, notes: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3.5 text-base"
              />
            </label>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-lg font-bold">Review your booking</h2>
            <div className="mt-6 flex gap-4 rounded-2xl bg-secondary p-4">
              <img src={service.image} alt="" loading="lazy" className="size-20 rounded-2xl object-cover" />
              <div>
                <p className="font-semibold">{service.name}</p>
                <p className="text-sm text-muted-foreground">{service.tagline}</p>
                <p className="mt-2 text-sm">
                  {from || "—"} → {to || "—"}
                </p>
              </div>
            </div>
            <dl className="mt-6 space-y-3 text-sm">
              {[
                ["Dog", `${dog.name} · ${dog.breed} · ${dog.age} yrs`],
                ["Location", "Kothrud, Pune"],
                ["Notes", dog.notes || "—"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-border pb-3">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
              <div className="flex justify-between pt-1 text-base font-bold">
                <span>Estimated total</span>
                <span>
                  {inr(service.price)} / {service.priceUnit}
                </span>
              </div>
            </dl>
          </>
        )}

        {step === 4 && (
          <div className="py-6 text-center">
            <div className="mx-auto grid size-16 animate-bounce place-items-center rounded-full bg-primary-soft text-primary">
              <PartyPopper className="size-7" />
            </div>
            <h2 className="mt-6 text-2xl font-bold">Request sent for {dog.name}!</h2>
            <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
              We'll confirm on WhatsApp within an hour. This is a demo booking — nothing is charged.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/bookings"
                className="rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground"
              >
                View my bookings
              </Link>
              <Link to="/" className="rounded-full bg-secondary px-7 py-3.5 font-semibold">
                Back home
              </Link>
            </div>
          </div>
        )}

        {step < 4 && (
          <button
            disabled={!canNext}
            onClick={() => setStep((s) => s + 1)}
            className="mt-8 w-full rounded-2xl bg-primary py-4 font-semibold text-primary-foreground transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {step === 3 ? (
              <span className="inline-flex items-center gap-2">
                <Check className="size-5" /> Confirm booking
              </span>
            ) : (
              "Continue"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
