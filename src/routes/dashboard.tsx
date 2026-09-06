import { createFileRoute, Link } from "@tanstack/react-router";
import { bookings, dogs, owner } from "@/data/mock";
import { Badge, Card, PageHero, Section } from "@/components/ui-kit";

const title = "Dashboard — Paw Brothers";
const description = "Your dogs, bookings and updates at a glance.";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/dashboard" },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/dashboard" }],
  }),
  component: DashboardPage,
});

const actions = [
  { to: "/book", label: "Book a Service", emoji: "📅" },
  { to: "/dogs", label: "My Dogs", emoji: "🐕" },
  { to: "/updates", label: "Paw Updates", emoji: "❤️" },
  { to: "/bookings", label: "Bookings", emoji: "🗓️" },
  { to: "/food", label: "Food", emoji: "🌿" },
  { to: "/contact", label: "Get help", emoji: "💬" },
] as const;

function DashboardPage() {
  return (
    <>
      <PageHero eyebrow="Dashboard" title={`Good morning, ${owner.name.split(" ")[0]} 👋`} sub="Here's what's happening with your Paw Brothers." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {dogs.map((d) => {
            const next = bookings.find((b) => b.dogId === d.id && b.status !== "completed" && b.status !== "cancelled");
            return (
              <Card key={d.id} className="flex items-center gap-5 p-6">
                <img src={d.photo} alt={d.name} width={110} height={110} loading="lazy" className="size-24 shrink-0 rounded-3xl object-cover" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate font-display text-xl font-bold">{d.name}</h2>
                    <Badge>{d.healthStatus}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{d.breed}</p>
                  <p className="mt-3 text-sm">
                    {next ? <>Next: <span className="font-semibold">{next.serviceName}</span> — {next.startDate}</> : "No upcoming bookings"}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {actions.map((a) => (
            <Link key={a.to} to={a.to} className="rounded-3xl border border-border bg-card p-5 text-center shadow-soft transition-transform hover:-translate-y-1">
              <span className="text-2xl">{a.emoji}</span>
              <p className="mt-2 text-sm font-semibold">{a.label}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
