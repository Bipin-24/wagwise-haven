import { dogs } from "@/data/mock";
import { Badge, ButtonLink, Card, Section, SectionHeading, Timeline } from "@/components/ui-kit";

export function DogStoryPage({ slug }: { slug: string }) {
  const dog = dogs.find((d) => d.slug === slug);
  if (!dog) return null;

  return (
    <>
      <header className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <Badge tone="accent">{dog.persona}</Badge>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl">{dog.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{dog.breed}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{dog.about}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/book">Book a service for {dog.name}</ButtonLink>
            <ButtonLink to="/dogs" variant="outline">All our dogs</ButtonLink>
          </div>
        </div>
        <img
          src={dog.photo}
          alt={dog.name}
          width={1000}
          height={1000}
          className="aspect-square w-full rounded-[2rem] object-cover shadow-lift"
        />
      </header>

      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-7">
            <h2 className="font-display text-xl font-bold">Personality</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {dog.personality.map((p) => (
                <li key={p} className="rounded-full bg-secondary px-3 py-1.5 text-sm font-medium">{p}</li>
              ))}
            </ul>
            <h3 className="mt-7 font-display text-lg font-bold">Favourite things</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {dog.favourites.map((f) => <li key={f}>❤️ {f}</li>)}
            </ul>
          </Card>

          <Card className="p-7">
            <h2 className="font-display text-xl font-bold">Daily routine</h2>
            <div className="mt-5">
              <Timeline items={dog.routine} />
            </div>
          </Card>

          <Card className="p-7">
            <h2 className="font-display text-xl font-bold">At a glance</h2>
            <dl className="mt-5 space-y-4 text-sm">
              {[
                ["Breed", dog.breed],
                ["Age", dog.age],
                ["Weight", `${dog.weightKg} kg`],
                ["Gender", dog.gender],
                ["Health", dog.healthStatus],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-4 border-b border-border pb-3">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {dog.name} is one half of the Paw Brothers — the reason this whole thing exists.
            </p>
          </Card>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Photos" title={`Life with ${dog.name}`} />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {dog.gallery.map((g, i) => (
            <img
              key={g + i}
              src={g}
              alt={`${dog.name} photo ${i + 1}`}
              width={600}
              height={750}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          ))}
        </div>
      </Section>
    </>
  );
}
