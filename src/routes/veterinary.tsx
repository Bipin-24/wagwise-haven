import { createFileRoute } from "@tanstack/react-router";
import { img } from "@/data/images";
import { vets } from "@/data/mock";
import { Badge, ButtonLink, Card, PageHero, Section, SectionHeading } from "@/components/ui-kit";

const title = "Veterinary Support — Paw Brothers Pune";
const description =
  "In-house veterinary care at Paw Brothers Pune. Every dog's health, food and medication is reviewed by our resident veterinarian, Dr. Sonal Dixit.";

export const Route = createFileRoute("/veterinary")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/veterinary" },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/veterinary" }],
  }),
  component: VeterinaryPage,
});

const vetServices = [
  "General consultation",
  "Preventive care",
  "Health guidance",
  "Medical record review",
  "Follow-up care",
];

function VeterinaryPage() {
  return (
    <>
      <PageHero
        eyebrow="🩺 Veterinary"
        title="Veterinary expertise with trust at the center."
        sub="Every dog who stays with us has their health, food and medication reviewed by our resident veterinarian — before the first meal is served."
        image={img.vet}
      >
        <Badge tone="sage">Open today</Badge>
      </PageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {vets.map((v) => (
            <Card key={v.id} className="overflow-hidden">
              <img
                src={img.sonal}
                alt="Dr. Sonal Dixit with a patient"
                width={800}
                height={1000}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover object-top"
              />
              <div className="p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground/70">
                  {v.role}
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold">{v.name}</h2>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  <li>✓ Qualified veterinarian</li>
                  <li>✓ Postgraduate veterinary education</li>
                  <li>✓ Currently pursuing a PhD in Veterinary Surgery</li>
                </ul>
                <p className="mt-5 leading-relaxed text-muted-foreground">{v.bio}</p>
              </div>
            </Card>
          ))}

          <div>
            <SectionHeading
              align="left"
              eyebrow="What we do"
              title="Health care that never leaves the building"
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {vetServices.map((s) => (
                <Card key={s} hover className="flex items-center justify-between gap-3 p-5">
                  <span className="font-medium">{s}</span>
                  <Badge tone="sage">Available</Badge>
                </Card>
              ))}
            </div>
            <p className="mt-8 rounded-2xl bg-secondary p-5 text-sm leading-relaxed text-muted-foreground">
              Veterinary care at Paw Brothers is provided by qualified professionals and subject to
              applicable regulations. Anything urgent is handled in person, not through this site.
            </p>
            <ButtonLink to="/contact" className="mt-6">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading
          eyebrow="Care in practice"
          title="The Paw Brothers under Dr. Sonal's care"
          sub="A familiar face, careful observation and practical guidance for every dog in our care."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card className="overflow-hidden">
            <img
              src={img.sonalWithGoofy}
              alt="Dr. Sonal Dixit with Goofy"
              width={800}
              height={1000}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="p-6">
              <h2 className="font-display text-xl font-bold">Goofy</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A calm check-in, a familiar face and plenty of reassurance.
              </p>
            </div>
          </Card>
          <Card className="overflow-hidden">
            <img
              src={img.sonalWithBruno}
              alt="Dr. Sonal Dixit with Bruno"
              width={800}
              height={1000}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="p-6">
              <h2 className="font-display text-xl font-bold">Bruno</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Thoughtful care that makes every visit feel safe and personal.
              </p>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
