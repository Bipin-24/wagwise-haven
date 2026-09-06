import { createFileRoute } from "@tanstack/react-router";
import { brand, dogs, founders, sampleReviews } from "@/data/mock";
import { img } from "@/data/images";
import { Badge, ButtonLink, Card, PageHero, Section, SectionHeading } from "@/components/ui-kit";

const title = "About Paw Brothers — Built by dog parents, for dog parents";
const description =
  "Paw Brothers started with two dogs, Bruno and Goofy. Meet the people building a trusted dog-care experience in Pune.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`${brand.city} • Coming Soon`}
        title="Paw Brothers started with two dogs."
        sub="We're dog parents ourselves. Bruno and Goofy are part of our family, and caring for them helped us understand how difficult it can be to find trusted care when life takes us away from our dogs."
        image={img.brothers}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {dogs.map((d) => (
            <Card key={d.id} hover className="overflow-hidden">
              <img src={d.photo} alt={d.name} width={900} height={700} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <div className="p-7">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-2xl font-bold">{d.name}</h2>
                  <Badge tone="accent">{d.persona}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{d.breed}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d.about}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Our team" title="Meet the people behind Paw Brothers" />
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          {founders.map((f) => (
            <Card key={f.id} className="p-7">
              <h3 className="font-display text-xl font-bold">{f.name}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{f.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.bio}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Sample testimonials" title="What we hope people will say" sub="These are sample testimonials, not real customer reviews." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {sampleReviews.map((r) => (
            <Card key={r.id} className="p-7">
              <p className="text-sm leading-relaxed">“{r.quote}”</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Sample testimonial</p>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <ButtonLink to="/facility">Join the waitlist</ButtonLink>
        </div>
      </Section>
    </>
  );
}
