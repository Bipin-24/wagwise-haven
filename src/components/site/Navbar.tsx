import { Link } from "@tanstack/react-router";
import { Menu, MapPin, Search, X, User } from "lucide-react";
import { useEffect, useState } from "react";
import { img } from "@/lib/data";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/services/boarding", label: "Boarding" },
  { to: "/services/training", label: "Training" },
  { to: "/services/vet", label: "Vet Care" },
  { to: "/services/food", label: "Food" },
  { to: "/about", label: "About Us" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 shadow-soft backdrop-blur-xl"
          : "bg-background/60 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:h-20">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={img.logo} alt="Paw Brothers" className="size-10 rounded-xl object-cover" />
          <span className="font-display text-lg font-extrabold tracking-tight">Paw Brothers</span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "bg-primary-soft text-primary" }}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            aria-label="Search"
            className="grid size-10 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-secondary"
          >
            <Search className="size-[18px]" />
          </button>
          <span className="hidden items-center gap-1.5 rounded-full bg-secondary px-3 py-2 text-sm font-medium xl:inline-flex">
            <MapPin className="size-4 text-primary" /> Pune
          </span>
          <Link
            to="/profile"
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-secondary lg:inline-flex"
          >
            <User className="size-4" /> Login
          </Link>
          <Link
            to="/book"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Book a Service
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-primary px-4 py-3.5 text-center text-base font-semibold text-primary-foreground"
            >
              Book a Service
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
