import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { ButtonLink, Card, Section, SectionHeading } from "@/components/ui-kit";
import { inr, trainingPrograms } from "@/data/mock";

const title = "Dog Training in Pune — Paw Brothers";
const description =
  "Puppy training, obedience, behaviour work, socialization and advanced training for dogs in Pune. Reward-based programmes, coming soon.";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/training" },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/training" }],
  }),
  component: TrainingPage,
});

function TrainingPage() {
  return (
    <ServicePage
      slug="training"
      heroTitle="Better communication. Better habits. Stronger bonds."
      heroCopy="Training the humans as much as the dogs, so the results last long after the sessions end."
    >
      <Section className="pt-0">
        <SectionHeading
          eyebrow="Programmes"
          title="Find the right programme"
          sub="Demo pricing — final pricing coming soon."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trainingPrograms.map((p) => (
            <Card key={p.id} hover className="flex flex-col p-7">
              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.level}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">Duration</dt>
                  <dd className="font-semibold">{p.weeks} weeks</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Sessions</dt>
                  <dd className="font-semibold">{p.sessions}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Trainer</dt>
                  <dd className="font-semibold">{p.trainer}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Price</dt>
                  <dd className="font-semibold">{inr(p.price)}</dd>
                </div>
              </dl>
              <ButtonLink to="/book" className="mt-6 w-full">
                Book Training
              </ButtonLink>
            </Card>
          ))}
        </div>
      </Section>
    </ServicePage>
  );
}
