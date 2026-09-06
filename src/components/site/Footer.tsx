import { Link } from "@tanstack/react-router";
import { MapPin, Instagram } from "lucide-react";
import { img } from "@/data/images";
import { brand } from "@/data/mock";

const serviceLinks = [
  { to: "/services", label: "Services" },
  { to: "/boarding", label: "Boarding" },
  { to: "/daycare", label: "Daycare" },
  { to: "/training", label: "Training" },
  { to: "/veterinary", label: "Veterinary" },
  { to: "/grooming", label: "Grooming" },
  { to: "/food", label: "Food" },
] as const;

const companyLinks = [
  { to: "/about", label: "About" },
  { to: "/bruno", label: "Bruno" },
  { to: "/goofy", label: "Goofy" },
  { to: "/facility", label: "Facility" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:py-20">
        <div>
          <div className="flex items-center gap-3">
            <img src={img.logo} alt="Paw Brothers" className="size-12 rounded-2xl object-cover" />
            <span className="font-display text-xl font-extrabold">Paw Brothers</span>
          </div>
          <p className="mt-5 font-display text-lg font-semibold">{brand.tagline}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            {brand.message}
          </p>
          <p className="mt-6 flex items-center gap-2 text-sm text-primary-foreground/70">
            <MapPin className="size-4" /> {brand.city}
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-primary-foreground/70">
            <Instagram className="size-4" /> Social links coming soon
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider">Services</h3>
          <ul className="mt-5 space-y-3 text-sm text-primary-foreground/70">
            {serviceLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-primary-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider">Paw Brothers</h3>
          <ul className="mt-5 space-y-3 text-sm text-primary-foreground/70">
            {companyLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-primary-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-primary-foreground/60 sm:px-6">
          © 2026 Paw Brothers · Pune, Maharashtra
        </div>
      </div>
    </footer>
  );
}
