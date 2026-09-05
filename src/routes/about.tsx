import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { img, stats } from "@/lib/data";
import { SectionHeading, Badge } from "@/components/site/ui-bits";

const DESC =
  "Paw Brothers started with two dogs — a German Shepherd and a Golden Retriever — and one belief: every dog deserves to feel at home.";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Paw Brothers — Our Story, Mission & Team" },
      { name: "description", content: DESC },
      { property: "og:title", content: "It started with a simple belief" },
      { property: "og:description", content: DESC },
    ],
  }),
});

const values = [
  { icon: Heart, t: "Love first", d: "Every dog is somebody's family. We treat them like ours." },
  { icon: ShieldCheck, t: "Safety, always", d: "Vaccination checks, small groups, vet on call, no exceptions." },
  { icon: Leaf, t: "Honest food", d: "Real ingredients. Nothing we wouldn't feed our own dogs." },
  { icon: Sparkles, t: "No force, ever", d: "Reward-based training and fear-free handling in everything we do." },
];

const team = [
  { name: "Bipin Pandey", role: "Founder & Head of Care", photo: img.walking },
  { name: "Dr. Priya Sharma", role: "Consulting Veterinarian", photo: img.vet },
  { name: "Meera Joshi", role: "Lead Trainer", photo: img.training },
];

function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge>Our story</Badge>
            <h1 className="mt-5 text-pretty text-3xl font-bold leading-tight sm:text-5xl">
              It started with a simple belief: every dog deserves to feel at home.
            </h1>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                I'm a dog lover first and a business owner second. When I travelled, I could never
                find a place in Pune that felt like home for my own German Shepherd and Golden
                Retriever — the original Paw Brothers. So I built one.
              </p>
              <p>
                Today that home has grown into a small, careful team: trainers who don't believe in
                force, vets you can reach at 10pm, cooks who make food we'd happily eat ourselves,
                and walkers who show up rain or shine.
              </p>
              <p>
                We stay deliberately small. Six dogs at a time. Real names, real updates, real
                relationships.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={img.play} alt="The two Paw Brothers dogs playing" loading="lazy" className="aspect-[3/4] w-full rounded-3xl object-cover shadow-soft" />
            <img src={img.ball} alt="A German Shepherd on the lawn" loading="lazy" className="mt-10 aspect-[3/4] w-full rounded-3xl object-cover shadow-soft" />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 rounded-3xl bg-primary p-8 text-primary-foreground sm:grid-cols-4 sm:p-12">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold sm:text-4xl">{s.value}</p>
              <p className="mt-2 text-sm text-primary-foreground/70">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our mission"
          title="Care so good you stop worrying"
          sub="We want a dog parent in Pune to leave for a two-week trip and think about their dog only because they miss them — not because they're anxious."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-3xl bg-card p-7 shadow-soft ring-1 ring-border">
              <div className="grid size-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                <Icon className="size-5" />
              </div>
              <p className="mt-5 font-bold">{t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Our team" title="The humans behind the paws" />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {team.map((m) => (
            <div key={m.name} className="overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border">
              <img src={m.photo} alt={m.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <div className="p-6">
                <p className="font-bold">{m.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14 rounded-3xl bg-secondary p-8 text-center sm:p-14">
          <h3 className="text-2xl font-bold sm:text-3xl">Come meet us — and the boys.</h3>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Visit the garden in Pune before you book anything. Most parents decide in ten minutes.
          </p>
          <Link
            to="/book"
            className="mt-7 inline-block rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Book a Service
          </Link>
        </div>
      </section>
    </div>
  );
}
