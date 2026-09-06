import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { Card, Section, SectionHeading } from "@/components/ui-kit";

const title = "Dog Daycare in Pune — Paw Brothers";
const description =
  "A safe place to play, socialize and relax while you're at work. Supervised dog daycare in Pune, coming soon from Paw Brothers.";

export const Route = createFileRoute("/daycare")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/daycare" },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/daycare" }],
  }),
  component: DaycarePage,
});

function DaycarePage() {
  return (
    <ServicePage
      slug="daycare"
      heroTitle="A safe place to play, socialize and relax."
      heroCopy="For dogs whose humans are at work — structured play, proper rest and supervision all day."
    >
      <Section className="pt-0">
        <SectionHeading
          eyebrow="The daycare rhythm"
          title="Busy mornings. Calm afternoons."
          sub="Play groups are matched by size, age and energy, with quiet rest built into every day."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Arrival", d: "Settle-in, greeting and a check of the day's instructions." },
            { t: "Play", d: "Supervised group play in matched, calm groups." },
            { t: "Rest", d: "A proper nap in a quiet space — not optional." },
            { t: "Pick-up", d: "A short summary of how the day went." },
          ].map((s) => (
            <Card key={s.t} hover className="p-6">
              <h3 className="font-display text-lg font-bold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </Card>
          ))}
        </div>
      </Section>
    </ServicePage>
  );
}
