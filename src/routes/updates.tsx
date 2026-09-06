import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { dogActivities, dogs } from "@/data/mock";
import { Card, PageHero, Section } from "@/components/ui-kit";
import { cn } from "@/lib/utils";

const title = "Paw Updates — Paw Brothers";
const description = "See how your dog's day is going: walks, meals, play, rest and photo updates from their stay.";

export const Route = createFileRoute("/updates")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/updates" },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/updates" }],
  }),
  component: UpdatesPage,
});

function UpdatesPage() {
  const [dogId, setDogId] = useState(dogs[0]?.id ?? "");
  const dog = dogs.find((d) => d.id === dogId);
  const activities = dogActivities.filter((a) => a.dogId === dogId);

  return (
    <>
      <PageHero eyebrow="Paw Updates" title="How their day is going." sub="A future feature, previewed with demo updates — walks, meals, play, rest and photos." />
      <Section>
        <div className="flex gap-2">
          {dogs.map((d) => (
            <button
              key={d.id}
              onClick={() => setDogId(d.id)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                dogId === d.id ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-muted",
              )}
            >
              {d.name}
            </button>
          ))}
        </div>

        <h2 className="mt-8 font-display text-2xl font-bold">{dog?.name}'s day</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {activities.map((a) => (
            <Card key={a.id} className="flex items-start gap-4 p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary text-lg">{a.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{a.label}</p>
                  <span className={cn("shrink-0 rounded-full px-3 py-1 text-xs font-semibold", a.done ? "bg-primary-soft text-primary" : "bg-secondary text-muted-foreground")}>
                    {a.done ? "Completed" : "Upcoming"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{a.time}</p>
                {a.note && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.note}</p>}
                {a.photo && (
                  <img src={a.photo} alt={a.label} width={800} height={500} loading="lazy" className="mt-3 aspect-[16/10] w-full rounded-2xl object-cover" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
