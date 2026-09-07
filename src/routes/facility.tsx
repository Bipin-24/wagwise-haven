import { createFileRoute } from "@tanstack/react-router";
import { facility } from "@/data/mock";
import { img } from "@/data/images";
import { Badge, Card, PageHero, Section, SectionHeading } from "@/components/ui-kit";
import { WaitlistForm } from "@/components/WaitlistForm";

const title = "Our Pune Home — Paw Brothers Boarding & Daycare";
const description =
  "Take a look around the Paw Brothers home in Pune — boarding rooms, a secure garden, training and grooming space, and an in-house vet.";

export const Route = createFileRoute("/facility")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/facility" },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/facility" }],
  }),
  component: FacilityPage,
});

function FacilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Pune • Open today"
        title="A place dogs love coming home to."
        sub="This is where Bruno and Goofy grew up — a real home with a garden, not a row of cages. Come see it before you book; most parents do."
        image={img.heroRun}
      />
      <Section>
        <SectionHeading eyebrow="Have a look around" title="Every corner built for dogs" sub="Nine spaces, one rule: if we would not leave Bruno or Goofy there, no dog goes there." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facility.areas.map((a) => (
            <Card key={a.name} hover className="p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="text-2xl">{a.emoji}</span>
                <Badge tone="sage">Open</Badge>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{a.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="waitlist" className="pt-0">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Say hello" title="Come meet us, and bring your dog." sub="Tell us a little about them and we'll set up a free visit — no booking needed." />
          <div className="mt-10">
            <WaitlistForm />
          </div>
        </div>
      </Section>
    </>
  );
}
