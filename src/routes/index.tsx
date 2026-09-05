import { createFileRoute } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.png.asset.json";
import heroPlayAsset from "@/assets/hero-play.jpg.asset.json";
import heroBallAsset from "@/assets/hero-ball.jpg.asset.json";
import heroRunAsset from "@/assets/hero-run.jpg.asset.json";
import { Home, GraduationCap, Stethoscope, Leaf, Phone, Mail, MapPin } from "lucide-react";

const DESCRIPTION =
  "Paw Brothers in Pune: loving home dog boarding, positive-reinforcement training, online vet consultations and natural dog food — run by a dog lover and his GSD and Golden Retriever.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Paw Brothers — Dog Boarding, Training & Natural Food in Pune" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Paw Brothers — A Second Home for Your Dog in Pune" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Paw Brothers",
          description: DESCRIPTION,
          areaServed: "Pune, Maharashtra, India",
          image: logoAsset.url,
        }),
      },
    ],
  }),
});

const services = [
  {
    icon: Home,
    title: "Home Boarding",
    text: "No cages, no kennels. Your dog stays in our home in Pune with garden play, sofas, and round-the-clock care while you travel.",
  },
  {
    icon: GraduationCap,
    title: "Dog Training",
    text: "Positive-reinforcement training shaped to your dog's breed and personality — from puppy basics to confident obedience.",
  },
  {
    icon: Stethoscope,
    title: "Online Vet Consult",
    text: "Quick, trusted veterinary guidance over video for non-emergency questions, diet advice and health checks.",
  },
  {
    icon: Leaf,
    title: "Natural Food",
    text: "Fresh, preservative-free meals made from locally sourced ingredients — the same food our own two dogs thrive on.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt="Paw Brothers logo — a German Shepherd and Golden Retriever in a heart"
              className="size-12 rounded-xl"
            />
            <span className="font-display text-2xl font-medium tracking-tight">Paw Brothers</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#services" className="hover:text-accent transition-colors">Services</a>
            <a href="#story" className="hover:text-accent transition-colors">Our Story</a>
            <a
              href="#contact"
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Book a Visit
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-14 pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-5/12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-soft text-accent text-xs font-semibold uppercase tracking-widest mb-6">
                <span className="size-1.5 rounded-full bg-accent" />
                Home dog care in Pune
              </div>
              <h1 className="font-display text-5xl md:text-6xl leading-[1.05] font-medium text-balance mb-6">
                Where every dog is treated like{" "}
                <span className="italic text-gold-muted">family</span>.
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground max-w-[46ch] mb-10">
                Paw Brothers began with our own two boys — a German Shepherd and a
                Golden Retriever. Now we open our home and garden to yours:
                boarding, training, vet guidance and natural food, all under one
                woof.
              </p>
              <div className="flex flex-wrap items-center gap-5">
                <a
                  href="#contact"
                  className="px-7 py-3.5 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity"
                >
                  Plan Their Stay
                </a>
                <a
                  href="#services"
                  className="text-sm font-semibold border-b-2 border-accent/40 pb-1 hover:border-accent transition-colors"
                >
                  Explore services
                </a>
              </div>
            </div>
            <div className="w-full lg:w-7/12 relative">
              <div className="rounded-[2rem] overflow-hidden ring-1 ring-border shadow-2xl">
                <img
                  src={heroPlayAsset.url}
                  alt="The Paw Brothers — a German Shepherd and a Golden Retriever playing on a sunlit lawn in Pune"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-6 bg-accent text-accent-foreground px-6 py-5 rounded-2xl shadow-xl hidden md:block max-w-xs">
                <p className="font-display text-lg italic leading-snug">
                  "A second home, approved by two very picky brothers."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-secondary/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-medium text-balance mb-4">
              Everything they need to thrive
            </h2>
            <p className="text-muted-foreground max-w-[52ch] mx-auto">
              From a safe place to stay while you're out of station, to the food
              in their bowl — care designed with love, not cages.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="group p-8 bg-card rounded-3xl ring-1 ring-border hover:shadow-xl transition-shadow duration-300"
              >
                <div className="size-12 bg-gold-soft rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <s.icon className="size-5" />
                </div>
                <h3 className="font-display text-xl font-medium mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder story */}
      <section id="story" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-accent font-semibold tracking-[0.2em] uppercase text-xs">
                The heart of Paw Brothers
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight text-balance">
                It started with a promise to two loyal friends.
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a dog lover first and a business owner second. When I
                  travelled, I could never find a place in Pune that felt like
                  home for my own German Shepherd and Golden Retriever — so I
                  built one.
                </p>
                <p>
                  Every guest here plays on the same lawn, eats the same natural
                  food, and gets the same love as the original Paw Brothers
                  themselves. That's the whole idea — family, not a facility.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl overflow-hidden ring-1 ring-border shadow-lg">
                  <img
                    src={heroBallAsset.url}
                    alt="German Shepherd and Golden Retriever running side by side on the Paw Brothers lawn"
                    className="w-full aspect-[3/4] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden ring-1 ring-border shadow-lg mt-10">
                  <img
                    src={heroRunAsset.url}
                    alt="The two Paw Brothers dogs playing fetch in the garden"
                    className="w-full aspect-[3/4] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <img
            src={logoAsset.url}
            alt="Paw Brothers logo"
            className="size-20 rounded-2xl mx-auto mb-8 shadow-lg"
          />
          <h2 className="font-display text-4xl md:text-5xl font-medium mb-6">
            Join the Paw Brothers family
          </h2>
          <p className="mb-10 text-primary-foreground/70 max-w-xl mx-auto">
            Boarding places are kept limited so every dog gets personal
            attention. Come meet us — and the boys — at our garden in Pune.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@pawbrothers.in"
              className="w-full sm:w-auto px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold hover:scale-[1.02] transition-transform"
            >
              Book a Boarding Stay
            </a>
            <a
              href="mailto:hello@pawbrothers.in"
              className="w-full sm:w-auto px-8 py-4 border border-primary-foreground/25 rounded-full font-medium hover:bg-primary-foreground/10 transition-colors"
            >
              Ask a Vet Online
            </a>
          </div>
          <div className="mt-14 pt-10 border-t border-primary-foreground/15 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p className="flex items-center gap-2">
              <MapPin className="size-4" /> Pune, Maharashtra
            </p>
            <p className="flex items-center gap-2">
              <Mail className="size-4" /> hello@pawbrothers.in
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4" /> Call or WhatsApp us
            </p>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border text-xs text-center text-muted-foreground uppercase tracking-widest">
        © {new Date().getFullYear()} Paw Brothers • Crafted with love in Pune
      </footer>
    </div>
  );
}
