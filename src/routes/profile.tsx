import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Syringe, Heart } from "lucide-react";
import { dogProfile } from "@/lib/data";
import { Badge } from "@/components/site/ui-bits";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [
      { title: "Bruno's Profile — Paw Brothers" },
      { name: "description", content: "Your dog's Paw Brothers profile: breed, age, vaccinations, allergies and care notes." },
      { property: "og:title", content: "Dog profile — Paw Brothers" },
      { property: "og:description", content: "Keep your dog's details in one place so every caretaker knows them." },
    ],
  }),
});

function ProfilePage() {
  const d = dogProfile;
  const facts = [
    ["Age", d.age],
    ["Breed", d.breed],
    ["Weight", d.weight],
    ["Gender", d.gender],
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-14">
      <div className="overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border">
        <div className="relative">
          <img src={d.photo} alt={d.name} className="h-64 w-full object-cover sm:h-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
          <div className="absolute bottom-0 p-6 text-background">
            <h1 className="text-3xl font-bold sm:text-4xl">{d.name}</h1>
            <p className="mt-1 text-background/85">
              {d.breed} · {d.age}
            </p>
          </div>
          <button
            aria-label="Favourite"
            className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-background/90 text-accent-foreground backdrop-blur transition-transform hover:scale-110 active:scale-95"
          >
            <Heart className="size-5 fill-accent text-accent" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {facts.map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-secondary p-4">
                <p className="text-xs text-muted-foreground">{k}</p>
                <p className="mt-1 font-semibold">{v}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-primary-soft p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Syringe className="size-4" /> Vaccination
              </p>
              <p className="mt-2 text-sm text-foreground/80">{d.vaccination}</p>
            </div>
            <div className="rounded-2xl bg-secondary p-5">
              <p className="text-sm font-semibold">Allergies</p>
              <p className="mt-2 text-sm text-foreground/80">{d.allergies}</p>
            </div>
            <div className="rounded-2xl bg-secondary p-5">
              <p className="text-sm font-semibold">Special instructions</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{d.notes}</p>
            </div>
          </div>

          <Link
            to="/book"
            className="mt-8 block rounded-2xl bg-primary py-4 text-center font-semibold text-primary-foreground transition-transform hover:scale-[1.01]"
          >
            Book a Service for {d.name}
          </Link>
        </div>
      </div>

      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-3xl border border-dashed border-input py-6 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary">
        <Plus className="size-4" /> Add another dog
      </button>
      <div className="mt-6 flex justify-center">
        <Badge tone="cream">Demo profile · sign-in coming later</Badge>
      </div>
    </div>
  );
}
