import { createFileRoute } from "@tanstack/react-router";
import { owner, dogs } from "@/data/mock";
import { ButtonLink, Card, PageHero, Section } from "@/components/ui-kit";

const title = "Profile — Paw Brothers";
const description = "Your Paw Brothers profile, dogs and contact preferences.";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/profile" },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/profile" }],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <>
      <PageHero eyebrow="Profile" title={owner.name} sub="Demo account — sign-in comes later." />
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-7">
            <h2 className="font-display text-xl font-bold">Details</h2>
            <dl className="mt-5 space-y-4 text-sm">
              {[["Name", owner.name], ["City", "Pune, Maharashtra"], ["Dogs", dogs.map((d) => d.name).join(" & ")]].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-4 border-b border-border pb-3">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card className="p-7">
            <h2 className="font-display text-xl font-bold">Quick links</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink to="/dogs">My dogs</ButtonLink>
              <ButtonLink to="/bookings" variant="outline">Bookings</ButtonLink>
              <ButtonLink to="/updates" variant="outline">Paw Updates</ButtonLink>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
