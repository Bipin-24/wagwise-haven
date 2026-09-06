import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { img } from "@/data/images";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home", exact: true },
  { to: "/services", label: "Services" },
  { to: "/boarding", label: "Boarding" },
  { to: "/daycare", label: "Daycare" },
  { to: "/training", label: "Training" },
  { to: "/veterinary", label: "Veterinary" },
  { to: "/grooming", label: "Grooming" },
  { to: "/food", label: "Food" },
  { to: "/about", label: "About" },
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
        scrolled ? "bg-background/85 shadow-soft backdrop-blur-xl" : "bg-background/60 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:h-20 lg:flex">
        <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={img.logo} alt="Paw Brothers" className="size-10 shrink-0 rounded-xl object-cover" />
          <span className="truncate font-display text-lg font-extrabold tracking-tight">Paw Brothers</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: "exact" in l }}
              activeProps={{ className: "bg-primary-soft text-primary" }}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/bruno"
            className="hidden rounded-full px-4 py-2.5 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary xl:inline-flex"
          >
            Meet Bruno &amp; Goofy
          </Link>
          <Link
            to="/book"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Book a Stay
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 shrink-0 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary lg:hidden"
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
                activeOptions={{ exact: "exact" in l }}
                onClick={() => setOpen(false)}
                activeProps={{ className: "bg-primary-soft text-primary" }}
                className="rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/bruno"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-secondary"
            >
              Meet Bruno &amp; Goofy
            </Link>
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-primary px-4 py-3.5 text-center text-base font-semibold text-primary-foreground"
            >
              Book a Stay
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
