import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
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

const searchLinks = [
  ...links,
  { to: "/my-pets", label: "Paw Profile" },
  { to: "/contact", label: "Book a Free Visit" },
  { to: "/contact", label: "Contact Paw Brothers" },
  { to: "/dashboard", label: "Owner dashboard" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const matches = searchLinks.filter((link) => link.label.toLowerCase().includes(query.trim().toLowerCase()));

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
          <button
            aria-label="Search pages"
            onClick={() => setSearchOpen(true)}
            className="grid size-10 shrink-0 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary"
          >
            <Search className="size-5" />
          </button>
          <Link
            to="/my-pets"
            className="hidden whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary 2xl:inline-flex"
          >
            Paw Profile
          </Link>
          <Link
            to="/bruno"
            className="hidden whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary 2xl:inline-flex"
          >
            Meet Bruno &amp; Goofy
          </Link>
          <Link
            to="/contact"
            className="hidden whitespace-nowrap rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Book a Free Visit
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
              to="/my-pets"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-secondary"
            >
              Paw Profile
            </Link>
            <Link
              to="/bruno"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-secondary"
            >
              Meet Bruno &amp; Goofy
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-primary px-4 py-3.5 text-center text-base font-semibold text-primary-foreground"
            >
              Book a Free Visit
            </Link>
          </nav>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-foreground/25 p-4 pt-24 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
          <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-4 shadow-lift" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-border pb-3">
              <Search className="size-5 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search pages and services"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button aria-label="Close search" onClick={() => setSearchOpen(false)} className="grid size-8 place-items-center rounded-full hover:bg-secondary">
                <X className="size-4" />
              </button>
            </div>
            <nav className="mt-3 grid gap-1" aria-label="Search results">
              {matches.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  activeOptions={{ exact: "exact" in link }}
                  onClick={() => {
                    setSearchOpen(false);
                    setQuery("");
                  }}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
                >
                  {link.label}
                </Link>
              ))}
              {matches.length === 0 && <p className="px-3 py-4 text-sm text-muted-foreground">No matching pages.</p>}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
