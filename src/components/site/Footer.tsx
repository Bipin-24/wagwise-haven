import { Link } from "@tanstack/react-router";
import { MapPin, Mail, Instagram, Phone } from "lucide-react";
import { img, services } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:py-20">
        <div>
          <div className="flex items-center gap-3">
            <img src={img.logo} alt="Paw Brothers" className="size-12 rounded-2xl object-cover" />
            <span className="font-display text-xl font-extrabold">Paw Brothers</span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            More than pet care. We're family. Boarding, training, vet care, grooming, walking and
            fresh food for dogs across Pune.
          </p>
          <div className="mt-6 space-y-2 text-sm text-primary-foreground/70">
            <p className="flex items-center gap-2">
              <MapPin className="size-4" /> Kothrud, Pune, Maharashtra
            </p>
            <p className="flex items-center gap-2">
              <Mail className="size-4" /> hello@pawbrothers.in
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4" /> Call or WhatsApp us
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider">Services</h3>
          <ul className="mt-5 space-y-3 text-sm text-primary-foreground/70">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="transition-colors hover:text-primary-foreground"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider">Company</h3>
          <ul className="mt-5 space-y-3 text-sm text-primary-foreground/70">
            <li>
              <Link to="/about" className="transition-colors hover:text-primary-foreground">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/community" className="transition-colors hover:text-primary-foreground">
                Community
              </Link>
            </li>
            <li>
              <Link to="/bookings" className="transition-colors hover:text-primary-foreground">
                My Bookings
              </Link>
            </li>
            <li>
              <Link to="/book" className="transition-colors hover:text-primary-foreground">
                Book a Service
              </Link>
            </li>
          </ul>
          <a
            href="#"
            className="mt-6 inline-flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
          >
            <Instagram className="size-4" /> @pawbrothers.pune
          </a>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 px-4 py-6 text-center text-xs text-primary-foreground/50">
        © {new Date().getFullYear()} Paw Brothers · Made with love in Pune. Demo content and prices.
      </div>
    </footer>
  );
}
