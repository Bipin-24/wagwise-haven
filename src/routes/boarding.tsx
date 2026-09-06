import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { Card, Section, SectionHeading, Timeline } from "@/components/ui-kit";
import { dayTimeline } from "@/data/mock";

const title = "Dog Boarding in Pune — Paw Brothers";
const description =
  "A second home while you're away. Supervised dog boarding in Pune with feeding to your instructions, exercise, rest and daily updates. Coming soon.";

export const Route = createFileRoute("/boarding")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/boarding" },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/boarding" }],
  }),
  component: BoardingPage,
});

function BoardingPage() {
  return (
    <ServicePage
      slug="boarding"
      heroTitle="A second home while you're away."
      heroCopy="Travel without worrying about who is caring for your dog."
    >
      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="How a stay works"
              title="Care planned around your dog, not a schedule."
              sub="Accommodation, feeding, walking, play, rest, individual care and updates — plus clear emergency information on file before every stay."
            />
            <div className="mt-8 grid gap-3">
              {[
                "Emergency contact and vet details recorded before arrival",
                "Feeding instructions followed exactly, meal by meal",
                "Medication schedules noted in the Paw Profile",
                "Daily photo and activity updates for parents",
              ].map((t) => (
                <Card key={t} className="px-5 py-4 text-sm font-medium">
                  ✓ {t}
                </Card>
              ))}
            </div>
          </div>
          <Card className="p-8">
            <h3 className="mb-6 font-display text-xl font-bold">A day during a stay</h3>
            <Timeline items={dayTimeline} />
          </Card>
        </div>
      </Section>
    </ServicePage>
  );
}
