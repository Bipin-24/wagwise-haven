import { createFileRoute } from "@tanstack/react-router";
import { facility } from "@/data/mock";
import { img } from "@/data/images";
import { Badge, Card, PageHero, Section, SectionHeading } from "@/components/ui-kit";
import { WaitlistForm } from "@/components/WaitlistForm";

const title = "Our Pune Facility — Coming Soon | Paw Brothers";
const description =
  "Paw Brothers is working toward a dedicated dog-care facility in Pune. See the planned spaces and join the waitlist.";

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
        eyebrow="Pune • Coming Soon"
        title="We're building a place dogs will love coming home to."
        sub="Paw Brothers is currently working toward establishing a dedicated dog-care facility in Pune."
        image={img.boarding}
      />
      <Section>
        <SectionHeading eyebrow="The plan" title="Spaces we're designing" sub="Everything below is planned — nothing here is open yet." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facility.areas.map((a) => (
            <Card key={a.name} hover className="p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="text-2xl">{a.emoji}</span>
                <Badge tone="accent">{a.status === "coming-soon" ? "Coming Soon" : "Planned"}</Badge>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{a.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="waitlist" className="pt-0">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Waitlist" title="Be part of the Paw Brothers journey." sub="Tell us about your dog and we'll keep you posted as we open." />
          <div className="mt-10">
            <WaitlistForm />
          </div>
        </div>
      </Section>
    </>
  );
}
