import { createFileRoute, Link } from "@tanstack/react-router";
import { dogs } from "@/data/mock";
import { Badge, Card, PageHero, Section } from "@/components/ui-kit";

const title = "My Dogs — Paw Brothers";
const description = "Digital Paw Profiles for Bruno and Goofy — personality, routine and care details in one place.";

export const Route = createFileRoute("/dogs")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/dogs" },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/dogs" }],
  }),
  component: DogsPage,
});

function DogsPage() {
  return (
    <>
      <PageHero eyebrow="Paw Profile" title="My dogs" sub="Every dog at Paw Brothers gets a digital profile — personality, routine, health and care preferences." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {dogs.map((d) => (
            <Link key={d.id} to={d.slug === "bruno" ? "/bruno" : "/goofy"} className="group">
              <Card hover className="overflow-hidden">
                <img src={d.photo} alt={d.name} width={900} height={700} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="p-7">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-display text-2xl font-bold">{d.name}</h2>
                    <Badge tone="accent">{d.persona}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{d.breed} · {d.age} · {d.weightKg} kg</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d.about}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
