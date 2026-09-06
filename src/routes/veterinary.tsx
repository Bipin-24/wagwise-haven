import { createFileRoute } from "@tanstack/react-router";
import { img } from "@/data/images";
import { vets } from "@/data/mock";
import { Badge, ButtonLink, Card, PageHero, Section, SectionHeading } from "@/components/ui-kit";

const title = "Veterinary Support — Paw Brothers Pune";
const description =
  "Veterinary expertise with trust at the center. Paw Brothers' veterinary support in Pune is coming soon, guided by Veterinary Advisor Sonal Dixit.";

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
        sub="Veterinary knowledge shapes how we plan care, keep records and respond to questions about your dog."
        image={img.vet}
      >
        <Badge tone="accent">Coming Soon</Badge>
      </PageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {vets.map((v) => (
            <Card key={v.id} className="p-8">
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
            </Card>
          ))}

          <div>
            <SectionHeading
              align="left"
              eyebrow="Planned services"
              title="What veterinary support will cover"
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {vetServices.map((s) => (
                <Card key={s} hover className="flex items-center justify-between gap-3 p-5">
                  <span className="font-medium">{s}</span>
                  <Badge tone="accent">Coming Soon</Badge>
                </Card>
              ))}
            </div>
            <p className="mt-8 rounded-2xl bg-secondary p-5 text-sm leading-relaxed text-muted-foreground">
              Veterinary services will be provided by appropriately qualified professionals and
              subject to applicable regulations. Paw Brothers does not provide medical advice within
              this application.
            </p>
            <ButtonLink to="/contact" className="mt-6">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
