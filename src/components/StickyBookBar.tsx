import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";

/** Desktop-only sticky booking bar that slides in after the hero. */
export function StickyBookBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-6 z-40 hidden justify-center px-4 transition-all duration-500 lg:flex ${
        show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="pointer-events-auto flex items-center gap-5 rounded-full border border-border bg-card/90 px-3 py-2 pl-6 shadow-lift backdrop-blur-md">
        <p className="text-sm">
          <span className="font-display font-bold">Planning a trip?</span>{" "}
          <span className="text-muted-foreground">
            Boarding from ₹600/night · free visit before you book
          </span>
        </p>
        <a
          href="tel:+919535702274"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          <Phone className="size-4" /> Call us
        </a>
        <Link
          to="/book"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          Book a stay <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
