import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { Card, Section, SectionHeading, ButtonLink } from "@/components/ui-kit";

const title = "Dog Grooming in Pune — Paw Brothers";
const description =
  "Gentle, unhurried grooming in Pune — bath, brush, coat care, nail care and ear cleaning, always at your dog’s pace. Coming soon.";

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

function GroomingPage() {
  return (
    <ServicePage
      slug="grooming"
      heroTitle="Gentle, thoughtful grooming for happy dogs."
      heroCopy="Calm handling at a pace your dog is comfortable with — never rushed, never forced."
    >
      <Section className="pt-0">
        <SectionHeading
          eyebrow="Coming soon"
          title="Grooming isn't open for booking yet"
          sub="We're setting up a calm, low-stress grooming space alongside boarding and daycare. Leave your details and we'll reach out the moment it's ready."
        />
        <Card className="mx-auto mt-10 max-w-3xl p-8 text-center">
          <p className="text-4xl">✂️</p>
          <h3 className="mt-4 font-display text-2xl font-bold">What to expect</h3>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {groomingServices.map((s) => (
              <span key={s} className="rounded-full bg-secondary px-4 py-2 text-sm font-medium">
                {s}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Want to be first in line when grooming opens? Tell us about your dog.
          </p>
          <ButtonLink to="/contact" className="mt-5">
            Get in touch
          </ButtonLink>
        </Card>
      </Section>
    </ServicePage>
  );
}
