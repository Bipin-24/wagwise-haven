import { createFileRoute, Link } from "@tanstack/react-router";
import { bookings, inr } from "@/lib/data";
import { Badge } from "@/components/site/ui-bits";

export const Route = createFileRoute("/bookings")({
  component: BookingsPage,
  head: () => ({
    meta: [
      { title: "My Bookings — Paw Brothers" },
      { name: "description", content: "Track your dog's boarding, grooming and vet appointments with Paw Brothers." },
      { property: "og:title", content: "My Bookings — Paw Brothers" },
      { property: "og:description", content: "Track your dog's upcoming and past Paw Brothers services." },
    ],
  }),
});

function BookingsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-16">
      <h1 className="text-2xl font-bold sm:text-3xl">My bookings</h1>
      <p className="mt-2 text-muted-foreground">Demo data — nothing here is a real reservation.</p>

      <div className="mt-8 space-y-4">
        {bookings.map((b) => (
          <div
            key={b.service + b.dates}
            className="flex items-center gap-4 rounded-3xl bg-card p-4 shadow-soft ring-1 ring-border"
          >
            <img src={b.image} alt="" loading="lazy" className="size-20 rounded-2xl object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{b.service}</p>
              <p className="text-sm text-muted-foreground">{b.dates}</p>
              <Badge
                tone={b.status === "Confirmed" ? "sage" : b.status === "Upcoming" ? "accent" : "cream"}
                className="mt-2"
              >
                {b.status}
              </Badge>
            </div>
            <p className="font-semibold">{inr(b.price)}</p>
          </div>
        ))}
      </div>

      <Link
        to="/book"
        className="mt-8 block rounded-2xl bg-primary py-4 text-center font-semibold text-primary-foreground"
      >
        Book another service
      </Link>
    </div>
  );
}
