import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
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
  { to: "/my-pets", label: "Paw Profile" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.35fr_1fr_1fr_1.25fr] lg:py-20">
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
            <Instagram className="size-4" />
            <a
              href="https://www.instagram.com/paww_brothers/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-primary-foreground"
            >
              @paww_brothers
            </a>
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

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider">Talk to us</h3>
          <ul className="mt-5 space-y-4 text-sm text-primary-foreground/70">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0" />
              <a href="mailto:pawbrothers24@gmail.com" className="transition-colors hover:text-primary-foreground">
                pawbrothers24@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <span>
                Bipin, Owner: <a href="tel:+919535702274" className="transition-colors hover:text-primary-foreground">9535702274</a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <span>
                Shalini, Owner: <a href="tel:+917499930533" className="transition-colors hover:text-primary-foreground">7499930533</a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <span>
                Dr. Sonal Dixit, Veterinary Advisor: <a href="tel:+919111821045" className="transition-colors hover:text-primary-foreground">9111821045</a>
              </span>
            </li>
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
