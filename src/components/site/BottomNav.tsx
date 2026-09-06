import { Link } from "@tanstack/react-router";
import { Home, Dog, CalendarDays, Heart, User, Plus } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/dogs", label: "My Dogs", icon: Dog },
  { to: "/bookings", label: "Bookings", icon: CalendarDays },
  { to: "/updates", label: "Updates", icon: Heart },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  return (
    <>
      <Link
        to="/book"
        aria-label="Book a service"
        className="fixed bottom-[74px] right-4 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform active:scale-95 lg:hidden"
      >
        <Plus className="size-6" />
      </Link>
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto flex max-w-lg">
          {items.map(({ to, label, icon: Icon, ...rest }) => (
            <li key={to} className="flex-1">
              <Link
                to={to}
                activeOptions={{ exact: "exact" in rest }}
                activeProps={{ className: "text-primary" }}
                className="flex min-h-14 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium text-muted-foreground transition-colors"
              >
                <Icon className="size-[22px]" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
