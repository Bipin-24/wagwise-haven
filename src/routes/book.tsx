import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { dogs, services, inr } from "@/data/mock";
import { createBooking } from "@/services/api";
import { Card, PageHero, Section } from "@/components/ui-kit";
import { cn } from "@/lib/utils";

const title = "Book a Stay — Paw Brothers Pune";
const description = "Request boarding, daycare, training or grooming for your dog at Paw Brothers in Pune.";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/book" },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/book" }],
  }),
  component: BookPage,
});

const steps = ["Service", "Dates", "Your dog", "Care preferences", "Review", "Confirmation"];
const bookable = services.filter((s) => ["boarding", "daycare", "training", "grooming"].includes(s.slug));
const field = "w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary";

function BookPage() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState(bookable[0]?.slug ?? "boarding");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [dog, setDog] = useState(dogs[0]?.name ?? "");
  const [notes, setNotes] = useState({ food: "", walks: "", medication: "", behaviour: "", emergency: "", special: "" });

  const serviceName = bookable.find((s) => s.slug === service)?.name ?? service;
  const pill = (active: boolean) =>
    cn("rounded-full px-4 py-2.5 text-sm font-medium transition-colors", active ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-muted");

  return (
    <>
      <PageHero eyebrow="Book" title="Request a stay." sub="Six simple steps. Demo booking — no payment and no confirmed reservation yet." />
      <Section className="pt-0">
        <Card className="mx-auto max-w-3xl p-8">
          <ol className="mb-8 flex flex-wrap gap-2 text-xs font-semibold">
            {steps.map((s, i) => (
              <li key={s} className={cn("rounded-full px-3 py-1.5", i === step ? "bg-primary text-primary-foreground" : i < step ? "bg-primary-soft text-primary" : "bg-secondary text-muted-foreground")}>
                {i + 1}. {s}
              </li>
            ))}
          </ol>

          {step === 0 && (
            <div>
              <h2 className="font-display text-2xl font-bold">Choose a service</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {bookable.map((s) => (
                  <button key={s.slug} onClick={() => setService(s.slug)} className={pill(service === s.slug)}>
                    {s.emoji} {s.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="font-display text-2xl font-bold">Choose dates</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium">Start<input type="date" value={start} onChange={(e) => setStart(e.target.value)} className={cn(field, "mt-2")} /></label>
                <label className="text-sm font-medium">End<input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className={cn(field, "mt-2")} /></label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display text-2xl font-bold">Choose your dog</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {[...dogs.map((d) => d.name), "Other dog"].map((d) => (
                  <button key={d} onClick={() => setDog(d)} className={pill(dog === d)}>{d}</button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold">Care preferences</h2>
              {([
                ["food", "Food instructions"],
                ["walks", "Walking preferences"],
                ["medication", "Medication"],
                ["behaviour", "Behaviour notes"],
                ["emergency", "Emergency contact"],
                ["special", "Special instructions"],
              ] as const).map(([k, label]) => (
                <input key={k} placeholder={label} value={notes[k]} onChange={(e) => setNotes({ ...notes, [k]: e.target.value })} className={field} />
              ))}
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="font-display text-2xl font-bold">Review</h2>
              <dl className="mt-5 space-y-3 text-sm">
                {[["Dog", dog], ["Service", serviceName], ["Dates", [start, end].filter(Boolean).join(" – ") || "To confirm"], ["Care instructions", Object.values(notes).filter(Boolean).join(" · ") || "None added"], ["Estimated price", `${inr(899)} per night (demo pricing)`]].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-border pb-3">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {step === 5 && (
            <div className="py-10 text-center">
              <p className="text-4xl">❤️</p>
              <h2 className="mt-4 font-display text-3xl font-bold">Booking request received</h2>
              <p className="mt-3 text-muted-foreground">Your request has been recorded. We'll confirm the stay shortly.</p>
            </div>
          )}

          {step < 5 && (
            <div className="mt-8 flex gap-3">
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="rounded-full border border-border px-6 py-3 text-sm font-semibold">Back</button>
              )}
              <button
                onClick={async () => {
                  if (step === 4) {
                    await createBooking({ service, start, end, dog, notes });
                    toast.success("Booking request recorded");
                  }
                  setStep(step + 1);
                }}
                className="flex-1 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                {step === 4 ? "Confirm request" : "Continue"}
              </button>
            </div>
          )}
        </Card>
      </Section>
    </>
  );
}
