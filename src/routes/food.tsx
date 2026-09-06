import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { foodCategories, foodProducts, inr } from "@/data/mock";
import { img } from "@/data/images";
import { Badge, Card, PageHero, Section, SectionHeading } from "@/components/ui-kit";
import { cn } from "@/lib/utils";

const title = "Natural Dog Food — Paw Brothers Pune";
const description =
  "Better choices for happier dogs. Thoughtfully selected meals, treats and nutrition products for dogs in Pune. Coming soon.";

export const Route = createFileRoute("/food")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/food" },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/food" }],
  }),
  component: FoodPage,
});

function FoodPage() {
  const [cat, setCat] = useState<string>("All");
  const list = cat === "All" ? foodProducts : foodProducts.filter((p) => p.category === cat);

  return (
    <>
      <PageHero
        eyebrow="🌿 Natural Food"
        title="Better choices for happier dogs."
        sub="A carefully chosen range of meals, treats and nutrition products for every life stage."
        image={img.food}
      >
        <Badge tone="accent">Coming Soon</Badge>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Shop preview" title="What we're putting on the shelf" />
        <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2">
          {["All", ...foodCategories].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                cat === c ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-muted",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <Card key={p.id} hover className="overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                width={700}
                height={525}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-bold">{p.name}</h3>
                  <Badge tone="accent">Coming Soon</Badge>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <p className="mt-4 font-display text-xl font-bold">{inr(p.price)}</p>
                <button
                  disabled
                  className="mt-4 w-full cursor-not-allowed rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-muted-foreground"
                >
                  Available soon
                </button>
              </div>
            </Card>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          Product details are illustrative. Paw Brothers does not make medical or nutritional
          health claims — please discuss your dog's diet with a qualified veterinarian.
        </p>
      </Section>
    </>
  );
}
