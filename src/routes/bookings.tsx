import { createFileRoute } from "@tanstack/react-router";
import { bookings, dogs, inr } from "@/data/mock";
import { Card, EmptyState, PageHero, Section, StatusBadge } from "@/components/ui-kit";
import type { BookingStatus } from "@/types";

const title = "Bookings — Paw Brothers";
const description = "Upcoming, pending, completed and cancelled bookings for your dogs at Paw Brothers.";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/bookings" },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/bookings" }],
  }),
  component: BookingsPage,
});

const groups: { key: BookingStatus; label: string }[] = [
  { key: "confirmed", label: "Upcoming" },
  { key: "pending", label: "Pending" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

function BookingsPage() {
  return (
    <>
      <PageHero eyebrow="Bookings" title="Your bookings" sub="Demo bookings — nothing here is a live reservation yet." />
      <Section>
        <div className="space-y-12">
          {groups.map((g) => {
            const list = bookings.filter((b) => b.status === g.key);
            return (
              <div key={g.key}>
                <h2 className="font-display text-2xl font-bold">{g.label}</h2>
                <div className="mt-5 grid gap-4">
                  {list.length === 0 ? (
                    <EmptyState title={`No ${g.label.toLowerCase()} bookings`} body="When you book a service it will show up here." />
                  ) : (
                    list.map((b) => {
                      const dog = dogs.find((d) => d.id === b.dogId);
                      return (
                        <Card key={b.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-5 sm:flex sm:justify-between">
                          <div className="flex min-w-0 items-center gap-4">
                            {dog && <img src={dog.photo} alt={dog.name} width={64} height={64} loading="lazy" className="size-14 shrink-0 rounded-2xl object-cover" />}
                            <div className="min-w-0">
                              <p className="truncate font-semibold">{b.serviceName}</p>
                              <p className="text-sm text-muted-foreground">
                                {dog?.name} · {b.startDate}{b.endDate ? ` – ${b.endDate}` : ""}
                              </p>
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-4">
                            <span className="font-semibold">{inr(b.estimate)}</span>
                            <StatusBadge status={b.status} />
                          </div>
                        </Card>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
