import { createFileRoute } from "@tanstack/react-router";
import { Heart, Users, PawPrint } from "lucide-react";
import { img, testimonials } from "@/lib/data";
import { SectionHeading, Rating, Badge } from "@/components/site/ui-bits";

const DESC =
  "Adoption drives, rescue stories, free training meet-ups and a WhatsApp circle of 2,000+ Pune dog parents.";

export const Route = createFileRoute("/community")({
  component: CommunityPage,
  head: () => ({
    meta: [
      { title: "The Paw Brothers Community — Pune Dog Parents" },
      { name: "description", content: DESC },
      { property: "og:title", content: "We're building a better world for dogs" },
      { property: "og:description", content: DESC },
    ],
  }),
});

const stories = [
  { title: "Simba's second chance", tag: "Rescue", text: "Found on Karve Road with a broken leg. Fostered, healed, and adopted 9 weeks later.", image: img.walking },
  { title: "Sunday park meet-up", tag: "Event", text: "40 dogs, 60 humans, one very chaotic game of fetch at Kamala Nehru Park.", image: img.community },
  { title: "Nori finds a home", tag: "Adoption", text: "Our shyest foster picked her own family — she refused to leave their car.", image: img.play },
  { title: "Free training Saturdays", tag: "Event", text: "Open obedience basics session, first Saturday of every month.", image: img.training },
];

function CommunityPage() {
  return (
    <div>
      <section className="relative">
        <img
          src={img.community}
          alt="Pune dog parents and their dogs together in a park"
          className="h-[320px] w-full object-cover sm:h-[440px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 to-foreground/20" />
        <div className="absolute inset-0 mx-auto flex max-w-4xl flex-col items-center justify-center px-6 text-center text-background">
          <Badge tone="cream" className="bg-background/90">
            <Heart className="size-3.5" /> Community
          </Badge>
          <h1 className="mt-5 text-3xl font-bold sm:text-5xl">
            We're building a better world for dogs.
          </h1>
          <p className="mt-4 max-w-xl text-background/85">{DESC}</p>
          <button className="mt-8 rounded-full bg-accent px-7 py-3.5 font-semibold text-accent-foreground transition-transform hover:scale-[1.03]">
            Join Our Community
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Users, v: "2,140", l: "Dog parents in the circle" },
            { icon: PawPrint, v: "186", l: "Dogs rehomed since 2023" },
            { icon: Heart, v: "48", l: "Free community events" },
          ].map(({ icon: Icon, v, l }) => (
            <div key={l} className="rounded-3xl bg-card p-7 text-center shadow-soft ring-1 ring-border">
              <Icon className="mx-auto size-6 text-primary" />
              <p className="mt-4 text-3xl font-bold">{v}</p>
              <p className="mt-1 text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <SectionHeading
            align="left"
            eyebrow="Stories"
            title="Rescues, adoptions and very good days"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stories.map((s) => (
              <article
                key={s.title}
                className="group overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <Badge>{s.tag}</Badge>
                  <h3 className="mt-3 font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <SectionHeading align="left" eyebrow="In their words" title="Loved by dogs. Trusted by humans." />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-3xl bg-card p-7 shadow-soft ring-1 ring-border">
                <Rating value={t.rating} />
                <blockquote className="mt-4 text-[15px] leading-relaxed text-foreground/85">
                  "{t.text}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <img src={t.avatar} alt="" loading="lazy" className="size-11 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.dog}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
