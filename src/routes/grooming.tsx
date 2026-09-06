import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ServicePage } from "@/components/ServicePage";
import { Card, Section, SectionHeading } from "@/components/ui-kit";
import { dogs } from "@/data/mock";
import { cn } from "@/lib/utils";

const title = "Dog Grooming in Pune — Paw Brothers";
const description =
  "Gentle, thoughtful grooming for happy dogs — bath, brush, coat care, nail care and ear cleaning. Coming soon in Pune.";

export const Route = createFileRoute("/grooming")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/grooming" },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/grooming" }],
  }),
  component: GroomingPage,
});

const groomingServices = ["Bath", "Brush", "Coat care", "Nail care", "Ear cleaning"];
const times = ["09:00", "11:00", "13:00", "15:00", "17:00"];

function GroomingPage() {
  const [service, setService] = useState(groomingServices[0]);
  const [dog, setDog] = useState(dogs[0]?.name ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(times[0]);
  const [done, setDone] = useState(false);

  const pill = (active: boolean) =>
    cn(
      "rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
      active ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-muted",
    );

  return (
    <ServicePage
      slug="grooming"
      heroTitle="Gentle, thoughtful grooming for happy dogs."
      heroCopy="Calm handling at a pace your dog is comfortable with — never rushed, never forced."
    >
      <Section className="pt-0">
        <SectionHeading
          eyebrow="Request a slot"
          title="Book a grooming visit"
          sub="Demo booking — nothing is charged and no slot is reserved yet."
        />
        <Card className="mx-auto mt-10 max-w-3xl p-8">
          {done ? (
            <div className="py-10 text-center">
              <p className="text-4xl">✂️</p>
              <h3 className="mt-4 font-display text-2xl font-bold">Grooming request received</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {service} for {dog}{date ? ` on ${date}` : ""} at {time}. We'll confirm shortly.
              </p>
            </div>
          ) : (
            <div className="space-y-7">
              <div>
                <p className="mb-3 text-sm font-semibold">Choose service</p>
                <div className="flex flex-wrap gap-2">
                  {groomingServices.map((s) => (
                    <button key={s} onClick={() => setService(s)} className={pill(service === s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold">Choose dog</p>
                <div className="flex flex-wrap gap-2">
                  {[...dogs.map((d) => d.name), "Other dog"].map((d) => (
                    <button key={d} onClick={() => setDog(d)} className={pill(dog === d)}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-3 text-sm font-semibold">Choose date</p>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <p className="mb-3 text-sm font-semibold">Choose time</p>
                  <div className="flex flex-wrap gap-2">
                    {times.map((t) => (
                      <button key={t} onClick={() => setTime(t)} className={pill(time === t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-secondary p-5 text-sm">
                <p className="font-semibold">Review</p>
                <p className="mt-1 text-muted-foreground">
                  {service} · {dog} · {date || "date to choose"} · {time}
                </p>
              </div>
              <button
                onClick={() => {
                  toast.success("Grooming request recorded");
                  setDone(true);
                }}
                className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
              >
                Request grooming
              </button>
            </div>
          )}
        </Card>
      </Section>
    </ServicePage>
  );
}
